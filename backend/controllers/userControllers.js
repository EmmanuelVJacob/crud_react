import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateTokens.js";

const authUser = expressAsyncHandler(async (req, res) => {
  const {email,password} = req.body;
  const user = await User.findOne({email})
console.log(user,"ll")
  if(user && (await user.matchPassword(password))){
   let token= generateToken(user._id)
    res.status(201).json({
        _id:user._id,
        name:user.name,
        email: user.email,
        token
    })
  }else{
    res.status(400)
    throw new Error('Invalid email or password')
  }
});
const RegisterUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("user already exist");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if(user){
    
 let token=   generateToken(user._id)

    res.status(201).json({
        _id:user._id,
        name:user.name,
        email: user.email,
        token
    })
  }else{
    res.status(400)
    throw new Error('Invalid user data')
  }
});
const LoggoutUser = expressAsyncHandler(async (req, res) => {
    res.cookie('jwt','',{
        httpOnly:true,
        expires: new Date(0),
    })
  res.status(200).json({ message: "user logged out" });
});
const  getUserProfile = expressAsyncHandler(async (req, res) => {
  const user = {
    _id : req.user._id,
    name : req.user.name,
    email : req.user.email
  }
  res.status(200).json(user);
});
const UpdateUserProfile = expressAsyncHandler(async (req, res) => {
const user = await User.findById(req.user._id)

if (user) {
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  if(req.body.password){
    user.password = req.body.password
  }

  const updatedUser = await user.save()

  res.status(200).json({
    _id : updatedUser._id,
    name : updatedUser.name,
    email: updatedUser.email
  })
} else {
  res.status(404)
  throw new Error('user not found')
}

  res.status(200).json({ message: "update user" });
});

export {
  authUser,
  RegisterUser,
  LoggoutUser,
  getUserProfile,
  UpdateUserProfile,
};
