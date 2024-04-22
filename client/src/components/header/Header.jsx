import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './header.css'
import Background from "./assets/bookingAppBack.jpeg"
import { faBed, faCalendarDays, faCar, faMinus, faPerson, faPlane, faPlus, faTaxi } from '@fortawesome/free-solid-svg-icons';
import { DateRange } from 'react-date-range';
import { useContext, useState } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from "date-fns"
import { useLocation, useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';
const Header = ({type}) => {
  const location = useLocation();
  const [destination, setDestination] = useState("")
  const [openDate, setOpenDate] = useState(false);
  //Date range 
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  })
  const navigate = useNavigate();
  const handleOptions =(name, operation)=>{
    setOptions(prev=>{
      return {...prev, [name]: operation === "i" ? options[name] + 1 : options[name] -1}
    })
  }
  //Context API destructuring
  const {dispatch} = useContext(SearchContext)
  const handleSearch = () =>{
    dispatch({type:"NEW_SEARCH", payload:{destination,dates,options}})
    navigate("/hotels",{state:{destination,dates,options}})
  }
  return (
    <div className="container">
      <div className={type === "list" ? "headerHotels": "header"}>
        <div className="headerContainer">
          <div className="headerList">
            <div className="headerListItem active">
              <FontAwesomeIcon icon={faBed} />
              <span>Stays</span>
            </div>
            <div className="headerListItem">
              <FontAwesomeIcon icon={faPlane} />
              <span>Flights</span>
            </div>
            <div className="headerListItem">
              <FontAwesomeIcon icon={faCar} />
              <span>Car rentals</span>
            </div>
            <div className="headerListItem">
              <FontAwesomeIcon icon={faBed} />
              <span>Attractions</span>
            </div>
            <div className="headerListItem">
              <FontAwesomeIcon icon={faTaxi} />
              <span>Airport taxis</span>
            </div>
          </div>
          {type === "list" && <div className="headerSearch hotelsHeader">
            <div className="headerSearchItem">
              <FontAwesomeIcon icon={faBed} className='headerIcon' />
              <input type="text" placeholder='Where are you going?' className='headerSearchInput' />
            </div>
            <div className="headerSearchItem">
              <FontAwesomeIcon icon={faCalendarDays} className='headerIcon' />
              <span onClick={() => setOpenDate(!openDate)} className='headerSearchText'>{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && <DateRange
                editableDateInputs={true}
                onChange={item => setDates([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dates}
                className='date'
              />}
            </div>
            <div className="headerSearchItem">
              <FontAwesomeIcon icon={faPerson} className='headerIcon' />
              <span className='headerSearchText' onClick={()=> setOpenOptions(!openOptions)}>{`${options.adult} adults - ${options.children} children - ${options.room} room`}</span>
              { openOptions &&
                <div className="options">
                <div className="optionItem">
                    <span className="optionText">Adult</span>
                  <div className="optionCounter">
                    <button disabled={options.adult <= 1 } className="optionCounterButton" onClick={()=>handleOptions('adult',"d")}><FontAwesomeIcon icon={faMinus}/> </button>
                    <span className="optionCounterNumber">{options.adult}</span>
                    <button className="optionCounterButton" onClick={()=>handleOptions('adult',"i")}><FontAwesomeIcon icon={faPlus}/></button>
                  </div>
                </div>
                <div className="optionItem">
                    <span className="optionText">Children</span>
                  <div className="optionCounter">
                    <button disabled={options.children <= 0 } className="optionCounterButton" onClick={()=>handleOptions('children',"d")}><FontAwesomeIcon icon={faMinus}/></button>
                    <span className="optionCounterNumber">{options.children}</span>
                    <button className="optionCounterButton" onClick={()=>handleOptions('children',"i")}><FontAwesomeIcon icon={faPlus}/></button>
                  </div>
                </div>
                <div className="optionItem">
                    <span className="optionText">Room</span>
                  <div className="optionCounter">
                    <button disabled={options.room <= 1 } className="optionCounterButton" onClick={()=>handleOptions('room',"d")}><FontAwesomeIcon icon={faMinus}/></button>
                    <span className="optionCounterNumber">{options.room}</span>
                    <button className="optionCounterButton" onClick={()=>handleOptions('room',"i")}><FontAwesomeIcon icon={faPlus}/></button>
                  </div>
                </div>
              </div>}
            </div>
            <div className="headerSearchItem2">
              <button className="headerBtn">Search</button>
            </div>
          </div>}
        </div>
      </div>
     {type !== "list" && <div className="headerText" style={type === "list" ? {backgroundColor:"#f2f2f2"} :{ backgroundImage: `url(${Background})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center center" }}>
        <div className="headerAndPara" >

          <h1 className="headerTitle" >
            Make yourself at home in paradise
          </h1>
          <p className='headerPara' >Choose from cabins, houses and more</p>
          <button className='holidayRentButton'>Discover holiday rentals</button>
          <div className="headerSearch">
            <div className="headerSearchItem">
              <FontAwesomeIcon icon={faBed} className='headerIcon' />
              <input type="text" placeholder='Where are you going?' className='headerSearchInput'onChange={(e)=> setDestination(e.target.value)} />
            </div>
            <div className="headerSearchItem">
              <FontAwesomeIcon icon={faCalendarDays} className='headerIcon' />
              <span onClick={() => setOpenDate(!openDate)} className='headerSearchText'>{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && <DateRange
                editableDateInputs={true}
                onChange={item => setDates([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dates}
                minDate={new Date()}
                className='date'
              />}
            </div>
            <div className="headerSearchItem">
              <FontAwesomeIcon icon={faPerson} className='headerIcon' />
              <span className='headerSearchText' onClick={()=> setOpenOptions(!openOptions)}>{`${options.adult} adults - ${options.children} children - ${options.room} room`}</span>
              { openOptions &&
                <div className="options">
                <div className="optionItem">
                    <span className="optionText">Adult</span>
                  <div className="optionCounter">
                    <button disabled={options.adult <= 1 } className="optionCounterButton" onClick={()=>handleOptions('adult',"d")}><FontAwesomeIcon icon={faMinus}/> </button>
                    <span className="optionCounterNumber">{options.adult}</span>
                    <button className="optionCounterButton" onClick={()=>handleOptions('adult',"i")}><FontAwesomeIcon icon={faPlus}/></button>
                  </div>
                </div>
                <div className="optionItem">
                    <span className="optionText">Children</span>
                  <div className="optionCounter">
                    <button disabled={options.children <= 0 } className="optionCounterButton" onClick={()=>handleOptions('children',"d")}><FontAwesomeIcon icon={faMinus}/></button>
                    <span className="optionCounterNumber">{options.children}</span>
                    <button className="optionCounterButton" onClick={()=>handleOptions('children',"i")}><FontAwesomeIcon icon={faPlus}/></button>
                  </div>
                </div>
                <div className="optionItem">
                    <span className="optionText">Room</span>
                  <div className="optionCounter">
                    <button disabled={options.room <= 1 } className="optionCounterButton" onClick={()=>handleOptions('room',"d")}><FontAwesomeIcon icon={faMinus}/></button>
                    <span className="optionCounterNumber">{options.room}</span>
                    <button className="optionCounterButton" onClick={()=>handleOptions('room',"i")}><FontAwesomeIcon icon={faPlus}/></button>
                  </div>
                </div>
              </div>}
            </div>
            <div className="headerSearchItem2">
              <button className="headerBtn" onClick={handleSearch}>Search</button>
            </div>
          </div>
        </div>
      </div>}
    </div>

  )
}

export default Header