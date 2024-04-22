import React,{ useContext, useEffect, useState } from "react";
import "./login.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import {useNavigate} from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";


const Login = () => {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,

    })
    const {loading, error, dispatch} = useContext(AuthContext);
    
    const handleChange = (e)=>{
        setCredentials((prev)=> ({...prev, [e.target.id]: e.target.value}))
    }

    const loginHandler = async (e)=>{
        e.preventDefault()
        dispatch({type: "LOGIN_START"})
        try{
           const res = await axios.post("http://localhost:5000/api/auth/login",credentials);
           dispatch({type:"LOGIN_SUCCESS", payload: res.data})
          
          toast.success('Logged In Successful!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
             navigate("/")
        }catch(err){
           dispatch({type:"LOGIN_FAILURE", payload: err.response.data})
           console.log("err", err.response.data);
           toast.error(`${error.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
           
            });
         //  localStorage.setItem("err", JSON.stringify(err.response.data))
           
        }
    };
    
  return (
    <>
  <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
transition= "Bounce"
/>
{/* Same as */}
<ToastContainer />
    <div className="login">
        <div className="lContainer">
            <input type="text" placeholder="username" id="username" onChange={handleChange} className="lInput" />
            <input type="password" placeholder="password" id="password" onChange={handleChange} className="lInput" />
            <button disabled={loading} className="lButton" onClick={loginHandler}>Login</button>
            {error && <span>{error.message}</span>}
        </div>
    </div>
    </>
  )
}

export default Login