import { useLocation } from 'react-router-dom'
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import './list.css'
import { useState } from 'react'
import { format } from 'date-fns'
import { DateRange } from 'react-date-range'
import SearchItem from '../../components/searchItem/SearchItem'
import useFetch from "../../hooks/useFetch"
const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination)
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);

  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);



  console.log(location);

  const { data, loading, error,reFetch } = useFetch(`http://localhost:5000/api/hotels/cityName?city=${destination}&min=${min || 0}&max=${max || 999}`)

  const handleClick = ()=>{
    reFetch()
  }
  return (
    <div>
      <Navbar />
      <Header type={"list"} />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="listTitle">Search</h1>
            <div className="listItem">
              <label >Destination</label>
              <input type="text" placeholder={destination} />
            </div>
            <div className="listItem">
              <label >Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && <DateRange onChange={item => setDates([item.selection])}
                minDate={new Date()}
                ranges={dates}
              />}
            </div>
            <div className="listItem">
              <label >Options</label>
              <div className="listOptions">
                <div className="listOptionItem">
                  <span className="listOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input type="Number" onChange={(e)=> setMin(e.target.value)}  className="listOptionInput" />
                </div>
                <div className="listOptionItem">
                  <span className="listOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input type="Number" onChange={(e)=> setMax(e.target.value)}  className="listOptionInput" />
                </div>
                <div className="listOptionItem">
                  <span className="listOptionText">
                    Adult
                  </span>
                  <input type="Number" min={1} className="listOptionInput" placeholder={options.adult} />
                </div>
                <div className="listOptionItem">
                  <span className="listOptionText">
                    Children
                  </span>
                  <input type="Number" min={0} className="listOptionInput" placeholder={options.children} />
                </div>
                <div className="listOptionItem">
                  <span className="listOptionText">
                    Room
                  </span>
                  <input type="Number" min={1} className="listOptionInput" placeholder={options.room} />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {loading ? "loading" :
              <>
                {data?.map(item => (
                  <SearchItem item={item} key={item._id}/>
                 ))
                }
              </>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default List