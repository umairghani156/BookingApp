import express from "express";
import { deleteUser, getAUser, getAllUsers, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//Host
//http://localhost:5000/api/users

// router.get("/checkauthentication", verifyToken,(req,res,next)=>{
//     res.send("Hello user you are authenticated ")
// })

// router.get("/checkuser/:id", verifyUser,(req,res,next)=>{
//     res.send("Hello user you are logged in and you can delete  ")
// })

// router.get("/checkadmin/:id", verifyAdmin,(req,res,next)=>{
//     res.send("Hello admin you are logged in and you can delete all accounts ")
// })

//UPDATE
//http://localhost:5000/api/users/:id

router.put("/:id",verifyUser, updateUser);

//DELETE
//http://localhost:5000/api/users/:id

router.delete("/:id",verifyUser, deleteUser)


//GET
//http://localhost:5000/api/users/:id
router.get("/:id",verifyUser, getAUser)

//GET ALL
//http://localhost:5000/api/users/:id
router.get("/", getAllUsers)


export default router;