import './featuredProperties.css'
import useFetch from '../../hooks/useFetch'
import { Spin } from 'antd'

const FeaturedProperties = () => {
    const { data, loading, error } = useFetch("http://localhost:5000/api/hotels?featured=true&limit=4")

    return (
        <div className='fp'>
            {loading ?
            <div className='loader'>
                <Spin tip="Loading" size="large">
                </Spin>
            </div>
             :
                <>{data?.map(item=>(<div className="fpItem" key={item._id}>
                    <img src={item.photos[0] ? item.photos[0] : "https://cf.bstatic.com/xdata/images/hotel/square600/121402222.webp?k=f7f266ab09f90ddea4464309eca14d79429afe4218ced6887cb52f82c42c03dc&o="} alt="" className='fpImg' />
                    <span className="fpName">{item?.name}</span>
                    <span className="fpCity">{item?.city}</span>
                    <span className="fpPrice">Starting from ${item?.cheapestPrices}</span>
                    {item.rating && <div className="fpRating">
                        <button>{item.rating}</button>
                        <span>Excellent</span>
                    </div>}
                </div>
            ))}
                </> }

        </div>

    )
}

export default FeaturedProperties