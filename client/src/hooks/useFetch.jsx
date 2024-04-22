import axios from "axios";
import { useEffect, useState } from "react"

const useFetch = (url)=>{
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)


    useEffect(()=>{
     const fetchData = async()=>{
        setLoading(true)
        try{
          const res =await axios.get(url);
          console.log("res", res);
          setData(res.data)
        }catch(err){
            console.log(err);
        }
        setLoading(false)
     }
     fetchData()
    },[url])

    const reFetch = async()=>{
        setLoading(!loading)
        try{
          const res = await axios.get(url);
          setData(res.data)
        }catch(err){
            console.log(err);
        }
        setLoading(!loading)
     }
    

   return {data, loading, error, reFetch}
};

export default useFetch;