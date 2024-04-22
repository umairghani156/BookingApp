import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./reserve.css";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Reserve = ({ setOpenModal, id }) => {
    const navigate = useNavigate()
    const [selectedRooms, setSelectedRooms] = useState([]);
    console.log("roomId", id);
    const { data, loading, error } = useFetch(`http://localhost:5000/api/hotels/room/${id}`)
    const {dates} = useContext(SearchContext)
    console.log("data", data);

    const getDatesInRange = (startDate, endDate)=>{
        const start = new Date(startDate);
        const end = new Date(endDate);

        const date = new Date(start.getTime());
        let list = []

        while (date <= end) {
            list.push(new Date(date).getTime());
            date.setDate(date.getDate()+ 1)
        }
        return list
    }
   
    const allDates = getDatesInRange(dates[0].startDate,dates[0].endDate);
    //console.log("alldates",allDates.includes(new Date(date).getTime("1713639600000")));
    const isAvailable = (roomNumber)=>{
        const isFound = roomNumber.unavailableDates.some((date)=>{
             allDates.includes(new Date(date).getTime())
        });
        console.log('isfound', isFound);
        return !isFound
    }
    const selectHandler = (e)=>{
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectedRooms(
            checked ? [...selectedRooms, value]
            : selectedRooms.filter((item)=> item !== value)
        )
    }
    const bookingHandler = async ()=>{
       try{
        await Promise.all(selectedRooms.map((roomId)=>{
            const res =  axios.put(`http://localhost:5000/api/rooms/availability/${roomId}`,{
                dates: allDates
            });
            return res.data;
        }));
        setOpenModal(false)
        navigate("/")
       }catch(err){

       }
    }
   
    return (
        <div className="reserve">
            <div className="rContainer">
                <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={() => setOpenModal(false)} />
                <span>Select your rooms: </span>
                {
                    data?.map((item) => (
                        <div className="rItem" key={item._id}>
                            <div className="rItemInfo">
                                <div className="rTitle">{item?.title}</div>
                                <div className="rDesc">{item?.desc}</div>
                                <div className="rMax">Max people: <b>{item?.maxPeople}</b></div>
                                <div className="rPrice">{item?.price}</div>
                            </div>
                            <div className="rSelectRooms">
                            {item.roomNumbers?.map((roomNumber)=>(
                                <div className="room" key={roomNumber._id}>
                                    <label>{roomNumber.number}</label>
                                    <input
                                    type="checkbox"
                                    value={roomNumber._id}
                                    onChange={selectHandler}
                                    disabled={!isAvailable(roomNumber) && !isAvailable(roomNumber)}
                                    />
                                </div>
                                ))
                            }
                            </div>
                        </div>
                    ))
                }
                <button onClick={bookingHandler} className="rButton">Reserve Now!</button>
            </div>
        </div>
    )
}

export default Reserve