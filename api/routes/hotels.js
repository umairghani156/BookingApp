import express from "express";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";
import { countByCity, countByType, createHotel, deleteHotel, getAHotel, getAllHotels, getByCity, getHotelRooms, updateHotel } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//Host
//http://localhost:5000/api/hotels

//CREATE
router.post("/",verifyAdmin, createHotel)

//UPDATE
//http://localhost:5000/api/hotels/:id

router.put("/:id",verifyAdmin, updateHotel);

//DELETE
//http://localhost:5000/api/hotels/:id

router.delete("/find/:id",verifyAdmin, deleteHotel)


//GET
//http://localhost:5000/api/hotels/:id
router.get("/find/:id", getAHotel);






//GET ALL
//http://localhost:5000/api/hotels/:id
router.get("/", getAllHotels)

router.get("/cityName/", getByCity)


router.get("/countByCity", countByCity);

router.get("/countByType", countByType);

router.get("/room/:id", getHotelRooms);


export default router;