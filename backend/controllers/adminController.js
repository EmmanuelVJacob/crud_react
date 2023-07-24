import asyncHandler from "express-async-handler";

 import generateToken from "../utils/generateTokens.js";
 import User from "../models/userModel.js";

 const adminLogin = asyncHandler(async(req,res)=>{
    const email = 'admin@gmail.com'
    const password = '123'
    const name = 'admin' 
    const Email = req.body.email
    const Password  = req.body.password  

    if(email==Email && password==Password){
        let token  = generateToken(password)

        res.status(201).json ({
            name,
            email,
            token
        })
    }else{
        res.status(401);
        throw new Error('Invalid email or password')
    }
 })


 const getUser = asyncHandler(async(req,res)=>{
    console.log('admin');
    try {
        const user = await User.find()
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal Server Error'})
    }
 })

 const deleteUser = asyncHandler(async(req,res)=>{
    const id = req.params.id
    const user = await User.findByIdAndRemove(id)

    if(!user){
        res.status(404).json({message:'user not deleted'})
    }else{
        res.status(200).json({message:'user deleted successfully'})
    }
 })

 const searchAdminUser = (req,res)=>{
    const query = req.query.name

    User.find({name:{regex: new RegExp(query,'i')}})
    .then((user_data)=>{
        res.status(200).json(user_data)
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({message:'internal server Error'})
    })
 }
 const getUserForEdit = asyncHandler(async(req,res)=>{
    const id = req.params.id
    
    const user = await User.findById(id)
    if(user){
        res.status(201).json(user)
    }else{
        res.status(500).json({message:'user not found'})
    }
 })

 const editUser=asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id)
    console.log(req.body,'ellam vannu');
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
    
 })
 
 const registerUser=asyncHandler (async(req,res)=>{
    const {name,email,password}=req.body
   const useExits=await User.findOne({email})
   if (useExits) {
     res.status(400)
    throw new Error ('User alredy exits')
    
   }

   const user =await User.create({
    name,
    email,
    password
   })
   if (user) {
 let token=   generateToken( user._id);

    res.status(200).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        image:user.image,
        token
    })
    
   }else{
    res.status(400)
    throw new Error ('invalid user data')   

   }
})

const logoutAdmin = asyncHandler(async (req, res) => {
   
  res.status(200).json({ message: "user logged out" });
});

 export {adminLogin,getUser,deleteUser,searchAdminUser,editUser,registerUser,getUserForEdit,logoutAdmin}