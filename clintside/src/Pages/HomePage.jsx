import React from 'react'
import Hero from '../Components/Hero'
import { useNavigate, NavLink } from 'react-router-dom'
import injection from '../assets/injection.jpg'
import lotion from '../assets/lotion.jpg'
// import Lottie from 'lottie-react'
// import HeroAnimation from "../assets/Animation - 1729868338288.json"
import Footer from '../Components/Footer'
import BrowseByCat from '../Components/BrowseByCat'
import FeaturedProd from '../Components/FeaturedProd'
import DiscountHome from '../Components/DiscountHome'
import Care from '../Components/Care'
import Contact from '../Components/Contact'
function HomePage() {
  
return (
    <div className='font-poppins'>
      {/* Hero Section */}
      <Hero/>
      {/* Categories */}
      <BrowseByCat />
      {/* Products */}
      <FeaturedProd />
      <Contact />
      {/* Discount Banner */}
      {/* <DiscountHome /> */}
      {/* Care */}
      {/* <Care /> */}
    </div>
  )
}

export default HomePage