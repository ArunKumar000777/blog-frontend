import React from 'react'
import './header.css'

const Header = () => {
  return (
    <div className='header'>
        <div className="headerTitles">
            <span className='headerTitle__sm'>React & Node</span>
            <span className='headerTitle__lg'>BLOG</span>
        </div>
        <img className='headerImage' src="https://images.pexels.com/photos/5436098/pexels-photo-5436098.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
    </div>
  )
}

export default Header