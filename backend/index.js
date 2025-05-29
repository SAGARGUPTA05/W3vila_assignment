const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const db=require("./config/db")
const authRouter=require("./routes/authRoute")
const pollRouter=require("./routes/pollRoute")
const path = require('path');
const DIRNAME=path.resolve();

db();
const app = express();

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));
app.use(express.json());


app.use("/api/auth", authRouter);
app.use("/api/polls", pollRouter );
app.use(express.static(path.join(DIRNAME,"/frontend/client/dist")));
app.use("*",(_,res)=>{
  res.sendFile(path.resolve(DIRNAME,"frontend","client","dist","index.html"));
})
app.listen(process.env.PORT,()=>{ console.log("server running ",process.env.PORT)})
