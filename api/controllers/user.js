import User from "../models/User.js"

export const createUser = async (req, res, next)=>{
    const newUser = await new User(req.body);

    try{
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
    }catch(err){
        next(err)
    }
}

//Update USER Func
export const updateUser = async(req,res, next)=>{
    try{
      const updateUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body},{
        new : true
      })
  
      res.status(200).json(updateUser)
    }catch(err){
       next(err)
    }
  };

//Delete a USER 
export const deleteUser = async(req,res, next)=>{
    try{
      const updateUser = await User.findByIdAndDelete(req.params.id)
  
  
      res.status(200).json("User has been deleted")
    }catch(err){
       res.status(500).json(err)
    }
  };

//GET A USER
export const getAUser = async(req,res, next)=>{
    try{
      const user = await User.findById(req.params.id)
      res.status(200).json(user)
    }catch(err){
       res.status(500).json(err)
    }
  };

//GET ALL USERS
export const getAllUsers = async(req,res, next)=>{
  
    try{
      const users = await User.find()
      res.status(200).json(users)
    }catch(err){
      next(err)
    }
  };