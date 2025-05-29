import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Poll = () => {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [message, setMessage] = useState("");
  const [hasVoted, setHasVoted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const fetchPoll = async () => {
    try {
      const res = await axios.get(`https://w3vila-assignment.onrender.com/api/polls/result/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const { poll, hasVoted, showResults } = res.data;
      setPoll(poll);
      setHasVoted(hasVoted);
      setShowResults(showResults);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to fetch poll");
    }
  };

  const handleVote = async () => {
    if (!selectedOption) {
      setMessage("Please select an option.");
      return;
    }

    try {
      await axios.post(
        `https://w3vila-assignment.onrender.com/api/polls/vote/${id}`,
        { option: selectedOption },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMessage("Vote submitted!");
      fetchPoll(); // Refresh poll data
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to vote");
    }
  };

  useEffect(() => {
    fetchPoll();
  }, []);

  if (!poll) return <p>Loading poll...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">{poll.question}</h2>
      <p className="text-sm text-gray-500 mb-4">
        Closes on: {new Date(poll.closingDate).toLocaleString()}
      </p>

      {!hasVoted && !showResults && (
        <>
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="border p-2 rounded mb-4 w-full"
          >
            <option value="">Select an option</option>
            {poll.options.map((opt, idx) => (
              <option key={idx} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <br />
          <button
            onClick={handleVote}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Submit Vote
          </button>
        </>
      )}

      {showResults && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Results:</h3>
          <ul>
            {poll.results.map((result, idx) => (
              <li key={idx} className="mb-1">
                {result.option}:{" "}
                <strong>{result.count}</strong> votes
              </li>
            ))}
          </ul>
          <p className="text-sm text-gray-500 mt-2">Total votes: {poll.totalVotes}</p>
        </div>
      )}

      {message && <p className="mt-4 text-red-600">{message}</p>}
    </div>
  );
};

export default Poll;
