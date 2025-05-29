const jwt=require("jsonwebtoken")
const User=require("../models/user")


const auth= async (req,res,next)=>{
  const token=req.headers.authorization?.split(" ")[1] 
  if(!token) {
    return res.status(401).json({ message:"unauthorized"})
  }
  try {
    const decode=jwt.verify(token,process.env.JWT_KEY);
    req.user=await User.findById(decode.id).select("-password");;
    next();
    
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token", error: err.message });
  }
}

module.exports=auth