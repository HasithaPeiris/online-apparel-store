import React from 'react'
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Slider from '../components/Slider'
import Categories from '../components/Categories'
import Products from '../components/Products'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import Header from '../components/Header'
import './home.css'

export default function Home() {
  return (
    <div>
        <Announcement/>
        {/* <Navbar/> */}
        <Header/>
        <Slider/>
        <Categories/>
        <div className='titles'>
          <span>Products</span>
        </div>
        <Products/>
        {/* <Newsletter/> */}
        <Footer/>
    </div>
  )
}
