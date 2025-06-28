import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className='header'>
        <div className="header-contents">
            <h2>Order your favorite food here</h2>
            <p>At <b>J.Bros Restaurant & Cafe</b>, we bring you the rich, authentic flavors of Indian cuisine in a cozy and inviting setting. Whether you're here for a quick coffee or a full family meal, we make every moment delicious.</p>
            <button><a href="#explore-menu">View Menu</a></button>
        </div>
    </div>
  )
}

export default Header