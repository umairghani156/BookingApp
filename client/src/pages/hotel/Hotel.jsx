import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import './hotel.css'
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'
import { useContext, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { useLocation, useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import Reserve from '../../components/reserve/Reserve'
import { AuthContext } from '../../context/AuthContext'


const Hotel = () => {
 
  const location = useLocation();
  const id = location.pathname.split("/")[2]
  console.log(id);
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { data, loading, error } = useFetch(`http://localhost:5000/api/hotels/find/${id}`)
 
  //Context API
  const { dates, options} = useContext(SearchContext)
  const { user} = useContext(AuthContext)

  const navigate = useNavigate();
  const milli_seconds_per_day = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2){
    const timeDiff = Math.abs(date2?.getTime() - date1?.getTime());
    const diffDays = Math.ceil(timeDiff / milli_seconds_per_day);
    return diffDays
  }
 const days =dayDifference(dates[0]?.endDate, dates[0]?.startDate)
  const handleOpen = (i) => {
    setSlideNumber(i)
    console.log("i", i);
    setOpen(true)
  }

  const handleMove = (dir)=>{
    let newSlideNumber;
    if(dir === "l"){
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber-1
    }else{
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber+1

    }
    setSlideNumber(newSlideNumber)
  }
  //Booking seat confirmation Func
  const handleClick = ()=>{
    if(user){
      setOpenModal(true)
    }else{
      navigate("/login")
    }
  }
  return (
    <div>
      <Navbar />
      <Header type="list" />
     {loading ? "Looading..." : <div className="hotelContainer">
        {open && <div className="slider">
          <FontAwesomeIcon
            icon={faCircleXmark}
            className="close"
            onClick={() => setOpen(false)}
          />
          <FontAwesomeIcon
            icon={faCircleArrowLeft}
            className="arrow"
            onClick={() => handleMove("l")}
          />
          <div className="sliderWrapper">
            <img src={data?.photos[slideNumber]} alt="" className="sliderImg" />
          </div>
          <FontAwesomeIcon
            icon={faCircleArrowRight}
            className="arrow"
            onClick={() => handleMove("r")}
          />
        </div>}
        <div className="hotelWrapper">
          <button className="bookNow">Reserve or Book Now!</button>
          <h1 className="hotelTitle">{data?.name}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{data?.address}</span>
          </div>
          <span className="hotelDistance">
            Excellent location - {data?.distance}m from center
          </span>
          <span className="hotelPriceHightlight">
            Book a stay over ${data?.cheapestPrices} at this property and get a free airport taxi
          </span>
          <div className="hotelImages">
            {
              data.photos?.map((photo, ind) => (
                <div className="hotelImgWrapper">
                  <img src={photo} alt="" className="hotelImg" onClick={()=>handleOpen(ind)} />
                </div>
              ))
            }
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">{data.title}</h1>
              <p className="hotelDesc">
                {data.desc}
              </p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a {days}-night stay!</h1>
              <span>
                Located in the real heart of Krakow, this property has an
                excellent location score of 9.8!
              </span>
              <h2>
                <b>${days && days * data.cheapestPrices * options.room }</b> ({days} nights)
              </h2>
              <button onClick={handleClick}>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>}
      {
        openModal && <Reserve setOpenModal={setOpenModal} id={id}/>
      }
    </div>
  )
}

export default Hotel