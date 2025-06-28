import React from 'react'
import './Orders.css'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { assets } from "../../assets/assets"

const Orders = ({ baseUrl }) => {

  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(`${baseUrl}/api/order/list`);
    if(response.data.success){
      setOrders(response.data.data);
      console.log(response.data.data);
    }
    else{
      toast.error("Error")
    }
  }

  const handleStatus = async (e, orderId) => {
    //console.log(e, orderId)
    const response = await axios.post(`${baseUrl}/api/order/status`,{
      orderId,
      status: e.target.value
    })
    if(response.data.success){
      await fetchAllOrders();
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [])

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order,index)=>(
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className='order-item-food'>
                {order.items.map((item,index)=>{
                  if(index===order.items.length-1){
                    return `${item.name} x ${item.quantity}`
                  }
                  else{
                    return `${item.name} x ${item.quantity}, `
                  }
                })}
              </p>
              <p className='order-item-name'>{`${order.address.firstName} ${order.address.lastName}`}</p>
              <div className="order-item-address">
                <p>{`${order.address.street},`}</p>
                <p>{`${order.address.city}, ${order.address.state}, ${order.address.pincode}`}</p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>
            <p>Items : {order.items.length}</p>
            <p>Discount: {order.discountAmount}</p>
            <p>Total amount paid after discount: ₹{order.amount}</p>
            <select onChange={(e)=>handleStatus(e,order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
