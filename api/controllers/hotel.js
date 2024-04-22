import Hotel from "../models/Hotel.js"
import Room from "../models/Room.js"

export const createHotel = async (req, res, next)=>{
    const newHotel = await new Hotel(req.body);

    try{
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    }catch(err){
        next(err)
    }
}

//Update Hotel Func
export const updateHotel = async(req,res, next)=>{
    try{
      const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body},{
        new : true
      })
  
      res.status(200).json(updateHotel)
    }catch(err){
       next(err)
    }
  };

//Delete a Hotel 
export const deleteHotel = async(req,res, next)=>{
    try{
      const updateHotel = await Hotel.findByIdAndDelete(req.params.id)
  
  
      res.status(200).json("Hotel has been deleted")
    }catch(err){
       res.status(500).json(err)
    }
  };

//GET A HOTEL
export const getAHotel = async(req,res, next)=>{
    try{
      const hotel = await Hotel.findById(req.params.id)
      res.status(200).json(hotel)
    }catch(err){
       res.status(500).json(err)
    }
  };

//GET ALL HOTELS
export const getAllHotels = async(req,res, next)=>{
  const limits = parseInt(req.query.limit)
  const {min, max, featured, ...others} = req.query
 

  
    try{
      const hotels =await Hotel.find({featured: req.query.featured, cheapestPrices: {$gt: min | 1, $lt: max || 999},}).limit(limits) // Query for limit how many data you want
      res.status(200).json(hotels)
    }catch(err){
      next(err)
    }
  };

  //GET BY CITY NAME
export const getByCity = async(req,res, next)=>{
  const limits = parseInt(req.query.limit)
  const {min, max, city, ...others} = req.query
 

  
    try{
      const cities =await Hotel.find({city: req.query.city, cheapestPrices: {$gt: min | 1, $lt: max || 999},}).limit(limits) // Query for limit how many data you want
      res.status(200).json(cities)
    }catch(err){
      next(err)
    }
  };

//COUNT BY CITY USING QUERY SELECTOR
export const countByCity = async(req,res, next)=>{
  const cities = req.query.cities.split(",")
  
  try{
   const list = await Promise.all(cities.map(city=>{
    return Hotel.countDocuments({city: city})
   }))
   res.status(200).json(list)
  }catch(err){
    next(err)
  }
};

//COUNT BY TYPE USING QUERY SELECTOR
export const countByType = async(req,res, next)=>{
  try{
    const hotelCount = await Hotel.countDocuments({type: "hotel"})
    const apartmentCount = await Hotel.countDocuments({type: "apartment"})
    const resortCount = await Hotel.countDocuments({type: "resort"})
    const villaCount = await Hotel.countDocuments({type: "villa"})
    const cabinCount = await Hotel.countDocuments({type: "cabin"})
    
    res.status(200).json([
      {type: "hotel", count: hotelCount},
      {type: "apartments", count: apartmentCount},
      {type: "resorts", count: resortCount},
      {type: "villas", count: villaCount},
      {type: "cabins", count: cabinCount},
      
    ])
  }catch(err){
    next(err)
  }
};

//GET ROOMS

export const getHotelRooms = async(req, res, next)=>{
  try{
   const hotel = await Hotel.findById(req.params.id);
   const list = await Promise.all(hotel.rooms.map((room)=>{
    return Room.findById(room)
   }));
   res.status(200).json(list)
    
  }catch(err){
    next(err)
  }
}