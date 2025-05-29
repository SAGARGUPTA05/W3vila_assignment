const express = require("express");
const router = express.Router();
const {
  deletePoll,
  createPoll,
  votes,
  result,
  getadminPolls,
  getPolls,
  updatePoll,
} = require("../controllers/pollcontroller");
const auth=require("../middleware/authorization")


router.post("/create", auth, createPoll); //creating poll
router.get("/", auth, getPolls);  //fetching polls
router.get("/admin", auth, getadminPolls); //fetching polls created by admin
router.post("/vote/:id", auth, votes);//giving vote
router.get("/result/:id", auth, result); //showing result
router.delete("/:id", auth, deletePoll); //performing delete
router.put("/:id", auth, updatePoll); //updating polls by admin

module.exports = router;
