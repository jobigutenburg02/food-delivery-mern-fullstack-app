import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const PlaceOrder = () => {
    const {getTotalCartAmount, token, food_list, cartItems, baseUrl} = useContext(StoreContext)
    const location = useLocation();
    const { cgst, sgst, discountAmount, deliveryFee, grandTotal } = location.state || {};
    const navigate = useNavigate()
    const [data, setData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        street:"",
        city:"",
        state:"",
        pincode:"",
        phone:""
    })
    
    // handling change in inputs while filling form
    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setData(data=>({...data, [name]:value}))
    }
    
    // for placing order, after submitting the form
    const placeOrder = async (e) => {
        e.preventDefault();
        let orderItems = [];
        food_list.map((item)=>{
            if(cartItems[item._id]>0){
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo)
            }
        })
        // console.log(orderItems);
        let orderData = {
            items: orderItems,
            address: data,
            cgstAmount: cgst,
            sgstAmount: sgst,
            discountAmount: discountAmount,
            deliveryAmount: deliveryFee,
            totalAmount: grandTotal,
        }

        let response = await axios.post(`${baseUrl}/api/order/place`, orderData, {headers:{token}})
        if(response.data.success){
            window.location.href = response.data.session_url; // send user to session URL 
        }
        else{
            alert("Error")
        }
    }
    
    /*
    ** when not logged in or no items are present in cart, 
    ** the user cannot proceed to current page (order) from previous page (cart)
    */
    useEffect(()=>{
        if(!token || getTotalCartAmount()===0){
            alert('Please login to place order.')
            navigate('/cart')
        }
    },[token])

    // useEffect(() => {
    //     console.log(data)
    // }, [data])

  return (
    <form onSubmit={placeOrder} className='place-order'>
        <div className="place-order-left">
            <p className='title'>Delivery Information</p>
            <div className="multi-fields">
                <input name='firstName' onChange={handleChange} value={data.firstName} type="text" placeholder='First Name' required />
                <input name='lastName' onChange={handleChange} value={data.lastName} type="text" placeholder='Last Name' required />
            </div>
            <input name='email' onChange={handleChange} value={data.email} type="email" placeholder='Email address' required />
            <input name='street' onChange={handleChange} value={data.street} type="text" placeholder='Street' required />
            <div className="multi-fields">
                <input name='city' onChange={handleChange} value={data.city} type="text" placeholder='City' required />
                <input name='state' onChange={handleChange} value={data.state} type="text" placeholder='State' required />
            </div>
            <input name='pincode' onChange={handleChange} value={data.pincode} type="text" placeholder='Pin code' required />
            <input name='phone' onChange={handleChange} value={data.phone} type="text" placeholder='Phone' required />
            <button type='submit'>Proceed to Payment</button>
        </div>
        
    </form>
  )
}

export default PlaceOrder
