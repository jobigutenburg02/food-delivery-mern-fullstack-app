import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    // console.log(success, orderId)

    const {baseUrl, setCartItems} = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        const response = await axios.post(`${baseUrl}/api/order/verify`, {success,orderId})
        console.log('Verification response:', response.data);
        if(response.data.success){
            localStorage.setItem("cart_cleared", "true");
            setCartItems({});
            navigate('/myorders');
        }
        else{
            navigate('/');
        }
    }

    useEffect(() => {
        verifyPayment();
    },[])

  return (
    <div className='verify'>
        <div className='spinner'></div>
    </div>
  )
}

export default Verify
