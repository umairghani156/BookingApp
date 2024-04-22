import express from "express";
import { createRoom, deleteRoom, getARoom, getAllRooms, updateRoom, updateRoomAvailability } from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();
//Host
//http://localhost:5000/api/:hotelId

//CREATE
router.post("/:hotelId",verifyAdmin, createRoom)

//UPDATE
//http://localhost:5000/api/rooms/:id

router.put("/availability/:id", updateRoomAvailability);

//Update ROOM AVAILABILITITY
router.put("/:id",verifyAdmin, updateRoom);


//DELETE
//http://localhost:5000/api/rooms/:id

router.delete("/:id/:hotelId",verifyAdmin, deleteRoom)


//GET
//http://localhost:5000/api/rooms/:id
router.get("/:id", getARoom)

//GET ALL
//http://localhost:5000/api/rooms/:id
router.get("/", getAllRooms)



export default router;