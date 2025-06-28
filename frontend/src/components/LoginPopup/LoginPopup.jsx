import React, { useContext, useEffect, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const LoginPopup = ({ setShowLogin }) => {
    
    const { baseUrl, setToken } = useContext(StoreContext)
    const [confirmPassword, setConfirmPassword] = useState("");
    const [currState, setCurrState] = useState("Login")
    const [data, setData] = useState({
        name:"",
        email:"",
        password:"",
    })
    
    // handles change of inputs while filling form
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(data => ({...data,[name]:value}))
    }
    
    // to login after form submission
    const onLogin = async (e) => {
        e.preventDefault()

        let newUrl = baseUrl
        if(currState==="Login"){
            newUrl += "/api/user/login"
        }
        else{
            // password validation
            if (data.password !== confirmPassword) {
                alert("Passwords do not match.");
                return;
            }
            newUrl += "/api/user/register"
        }

        const response = await axios.post(newUrl, data);
        if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setShowLogin(false)
        }
        else{
            alert(response.data.message)
        }
    }

    // useEffect(() => {
    //     console.log(data)
    // }, [data])

  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} className='login-popup-container'>
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {currState==="Login"?<></>:<input name='name' onChange={handleChange} value={data.name} type="text" placeholder='Your name' required />}
                <input name='email' onChange={handleChange} value={data.email} type="email" placeholder='Your email' required />
                <input name='password' onChange={handleChange} value={data.password} type="password" placeholder='Your password' required />
                {currState==="Sign Up" && <input name='confirmPassword' onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword} type="password" placeholder='Confirm password' required />}
            </div>
            <button type='submit'>{currState==="Sign Up"?"Create account":"Login"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>I agree to the terms of use & privacy policy</p>
            </div>
            {currState==="Login"
            ?<p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>
            :<p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>
            }
            
        </form>
    </div>
  )
}

export default LoginPopup