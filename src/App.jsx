import React, { useState } from 'react'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Products from './pages/Products'
import Navbar from './components/Navbar'
import { useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Router, Routes, Route } from "react-router";
import Footer from './components/Footer'
import SingleProduct from './pages/SingleProduct'
import CategoryProduct from './pages/CategoryProduct'
import { useUser } from '@clerk/react';
import { useCart } from './context/CartContext'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {

  const [location, setLocation] = useState()
  const [openDropDown, setOpenDropDown] = useState(false);
  const { clearCart } = useCart()
  const { isSignedIn ,isLoaded} = useUser();


  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(async pos => {
      const { latitude, longitude } = pos.coords
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=en`
      try {
        const location = await axios.get(url);
        const exactLocation = location.data.address
        setLocation(exactLocation);
        setOpenDropDown(false);
      }
      catch (error) {
        console.log(error);

      }
    })
  }

  useEffect(() => {
    getLocation()
  }, [])

  //  Signout par cart clear
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      clearCart();
    }
  }, [isLoaded,isSignedIn]);
  return (
    <BrowserRouter>
      <Navbar location={location} getLocation={getLocation}
        openDropDown={openDropDown} setOpenDropDown={setOpenDropDown} />

      <div className='pt-20'>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<ProtectedRoute><Cart location={location} getLocation={getLocation} /></ProtectedRoute>} />
          <Route path='/Category/:Category' element={<CategoryProduct />} />
         
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  )
}
export default App