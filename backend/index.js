const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const db=require("./config/db")
const authRouter=require("./routes/authRoute")
const pollRouter=require("./routes/pollRoute")

db();
const app = express();

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/polls", pollRouter );


app.listen(process.env.PORT,()=>{ console.log("server running ",process.env.PORT)})
