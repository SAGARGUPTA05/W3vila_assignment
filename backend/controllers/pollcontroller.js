const Vote=require("../models/vote")



// Create Poll (Admin only)
const createPoll=async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Only admins can create polls" });

    const { question, options, closingDate } = req.body;

    if (!question || options.length < 2 || !closingDate) {
      return res.status(400).json({ message: "Missing required fields " });
    }

    const poll = await Vote.create({
      question,
      options,
      closingDate,
      createBy: req.user.id,
    });

    res.status(201).json(poll);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// user can feth the open polls
const getPolls=async (req, res) => {
  try {
    const now = new Date();
    const polls = await Vote.find();
    res.json(polls);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// admins fetch the polls created by them
const getadminPolls= async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Admins only" });
    const polls = await Vote.find({ createBy: req.user.id });
   
    res.json(polls);
  } catch (err) {

    res.status(500).json({ message: "Internal server error" });
  }
};

// get information of result
const result= async (req, res) => {
  try {
    const poll = await Vote.findById(req.params.id);
    if (!poll) return res.status(404).json({ message: "Poll not found" });

    const hasVoted = poll.votes.some((v) => v.userId.toString() === req.user.id);
    const isClosed = poll.isClosed || new Date(poll.closingDate) < new Date();

    const results = poll.options.map((optn) => ({
      option: optn,
      count: poll.votes.filter((v) => v.selectedOption === optn).length,
    }));

    res.json({
      poll: {
        _id: poll._id,
        question: poll.question,
        options: poll.options,
        closingDate: poll.closingDate,
        results,
        totalVotes: poll.votes.length,
      },
      hasVoted,
      showResults: hasVoted && isClosed,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Vote given by user
const votes=async (req, res) => {
  try {
    if (req.user.role !== "user") return res.status(403).json({ message: "Only users can vote" });

    const poll = await Vote.findById(req.params.id);
    if (!poll) return res.status(404).json({ message: "Poll not found" });

    if (poll.isClosed || new Date(poll.closingDate) < new Date()) {
      return res.status(403).json({ message: "Poll is closed" });
    }

    if (poll.votes.some((v) => v.userId.toString() === req.user.id)) {
      return res.status(403).json({ message: "Already voted" });
    }

    const { option } = req.body;
    if (!poll.options.includes(option)) {
      return res.status(400).json({ message: "Invalid option" });
    }

    poll.votes.push({ userId: req.user.id, selectedOption: option });
    await poll.save();

    res.json({ message: "Vote recorded" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error"});
  }
};

// Delete poll by admin only
const deletePoll= async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Admins only" });

    const poll = await Vote.findById(req.params.id);
    if (!poll) return res.status(404).json({ message: "Poll not found" });

    if (poll.createBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await poll.deleteOne();
    res.json({ message: "Poll deleted" });
  } catch (err) {
    
    res.status(500).json({ message: "Internal server error" });
  }
};

//update poll

const updatePoll=async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Admins only" });

    const poll = await Vote.findById(req.params.id);
    if (!poll) return res.status(404).json({ message: "Poll not found" });

    if (poll.createBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not able to update" });
    }

    const { question, options, closingDate } = req.body;

    if (question) poll.question = question;
    if ( options.length >= 2) poll.options = options;
    if (closingDate) poll.closingDate = closingDate;

    await poll.save();

    res.json({ message: "Poll updated", poll });
  } catch (err) {
    res.status(500).json({ message: "Internal server error"});
  }
};


module.exports={
    deletePoll,
    createPoll,
    votes,
    result,
    getadminPolls,
    getPolls,
    updatePoll
    
}
