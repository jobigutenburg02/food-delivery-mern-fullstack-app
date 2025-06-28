import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({ baseUrl }) => {
  
  const [list, setList] = useState([]);
  
  const fetchList = async () => {
    const response = await axios.get(`${baseUrl}/api/food/list`);
    // console.log(response.data)
    if(response.data.success) {
      setList(response.data.data)
    }
    else{
      toast.error("Error")
    }
  }

  const removeFood = async(foodId) => {
    // console.log(foodId)
    const response = await axios.post(`${baseUrl}/api/food/remove`,{id:foodId})
    await fetchList();
    if(response.data.success){
      toast.success(response.data.message)
    }
    else{
      toast.error("Error")
    }
  }

  useEffect(() => {
    fetchList();
  },[])

  return (
    <div className='list flex-col'>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return (
            <div key={index} className="list-table-format">
              <img src={`${baseUrl}/images/`+item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>₹{item.price}</p>
              <button onClick={()=>removeFood(item._id)} className='cursor'>Remove</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List
