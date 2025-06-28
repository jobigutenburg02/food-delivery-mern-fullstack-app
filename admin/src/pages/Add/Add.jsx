import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({ baseUrl }) => {
  
  const [image, setImage] = useState(false)
  const [data, setData] = useState({
      name:"",
      description:"",
      price:"",
      category:"Roti"
  })

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent reloading webpage once submitting

    const formData = new FormData();
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("price", Number(data.price))
    formData.append("category", data.category)
    formData.append("image", image)

    const response = await axios.post(`${baseUrl}/api/food/add`, formData);
    if(response.data.success){
      // reset form data
      setData({
        name:"",
        description:"",
        price:"",
        category:"Roti"
      })
      setImage(false)
      toast.success(response.data.message)
    }else{
      toast.error(response.data.message)
    }
  }

  // useEffect(() => {
  //   console.log(data)
  // },[data]);

  return (
    <div>
      <div className="add">
        <form onSubmit={handleSubmit} className='flex-col'>
          <div className="add-img-upload flex-col">
            <p>Upload image</p>
            <label htmlFor="image">
              <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
            </label>
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required />
          </div>
          <div className="add-product-name flex-col">
            <p>Product name</p>
            <input onChange={handleChange} value={data.name} type="text" name='name' placeholder='Type here' />
          </div>
          <div className="add-product-description flex-col">
            <p>Product Description</p>
            <textarea onChange={handleChange} value={data.description} name="description" rows="6" placeholder='Write content here'></textarea>
          </div>
          <div className="add-category-price">
            <div className="add-category flex-col">
              <p>Product category</p>
              <select onChange={handleChange} value={data.category} name="category" >
                <option value="Roti">Roti</option>
                <option value="Dosa">Dosa</option>
                <option value="Nan">Nan</option>
                <option value="Biryani">Biryani</option>
                <option value="Fried Rice">Fried Rice</option>
                <option value="Veg Curry">Veg Curry</option>
                <option value="Non-Veg Curry">Non-Veg Curry</option>
                <option value="Tea">Tea</option>
                <option value="Coffee">Coffee</option>
                <option value="J.Bros Special">J.Bros Special</option>
              </select>
            </div>
            <div className="add-price flex-col">
              <p>Product price</p>
              <input onChange={handleChange} value={data.price} type="Number" name='price' placeholder='₹20' />
            </div>
          </div>
          <button type='submit' className='add-btn'>ADD</button>
        </form>
      </div>
    </div>
  )
}

export default Add