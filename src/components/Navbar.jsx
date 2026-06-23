import React, { useState } from 'react'
import  '../index.css';
import { FaCaretDown } from 'react-icons/fa'
import { IoCartOutline } from 'react-icons/io5'
import { MapPin } from 'lucide-react'
import { Link, NavLink, useNavigate } from 'react-router'
import { Show, SignInButton, SignUpButton, UserButton, useUser } from '@clerk/react'
import { CgClose } from 'react-icons/cg';
import { useCart } from '../context/CartContext';
import { HiOutlineMenuAlt1, HiOutlineMenuAlt3 } from 'react-icons/hi';
import ResponsiveMenu from './ResponsiveMenu';
import { toast } from 'react-toastify';
import { Lock } from 'lucide-react';

const Navbar = ({location ,getLocation ,setOpenDropDown,openDropDown}) => {
const [openNav,setOpenNav]=useState(false)
 const { cartItem } = useCart();
const { isSignedIn } = useUser(); 
 const navigate = useNavigate();  

const toggleDropDown=()=>{
    setOpenDropDown(!openDropDown)
}
    const navLinkClass = ({ isActive }) => {
        return isActive
            ? "border-b-2 transition-all border-red-500 cursor-pointer" :
            "";
    };  
    
    const handleCartClick = (e) => {
        e.preventDefault();

        if (!isSignedIn) {
            toast.info(  <span className='flex items-center gap-2'>
        <Lock className='text-lg' /> Please sign in to view your cart
    </span>);
            return;
        }

        navigate('/cart');
    };

    return (

        <div className='bg-white py-3 shadow-2xl px-4  md:px-0 fixed top-0 left-0 right-0 z-50'>
            <div className='max-w-6xl mx-auto flex justify-between items-center '>
                {/* logo section */}
                <div className='flex gap-7 items-center '>
                    <Link to='/'><h1 className='font-bold text-3xl'><span className='text-red-600 font-serif'>K</span>artly</h1></Link>
                    <div className='gap-1 cursor-pointer text-gray-700 items-center hidden md:flex'>
                        {/* location  */}
                        <MapPin className='text-red-500' />
                        <span className='font-semibold space-y-2'>{location ? <div>
                            <p >{location.house_number}</p>
                            <p> {location.county}</p>
                            <p>{location.country}</p>
                            </div> : "Add Address"}</span>

                        <FaCaretDown onClick={toggleDropDown} />
                      {
                        openDropDown ? <div 
                        className='w-62.5 h-max shadow-2xl z-50 bg-white fixed top-16 left-60
                        border-2 p-5 border-gray-100 rounded-md hover:scale-105 transition-all duration-3'> 
                      <h1 className='font-semibold mb-4 text-xl flex justify-between'>
                        Change Location<span onClick={toggleDropDown}><CgClose/></span> </h1>
                        <button onClick={getLocation}  className='bg-red-500  rounded-md h-8 px-3 py-1 text-white hover:bg-red-400'>Detect my location</button>
                        </div> :null
                      }
                    </div>
                </div>
                {/* Menu section */}
                <nav className='flex gap-7'>
                    <ul className= ' md:flex gap-7 items-center text-xl font-semibold hidden'>
                        <NavLink to='/' className={navLinkClass}><li>Home</li></NavLink>
                        <NavLink to='/products' className={navLinkClass}><li>Products</li></NavLink>
                        <NavLink to='/about' className={navLinkClass}><li>About</li></NavLink>
                        <NavLink to='/contact' className={navLinkClass}><li>Contact</li></NavLink>
                    </ul>
                    <div className='relative cursor-pointer' onClick={handleCartClick}>
                        <IoCartOutline className='h-7 w-7' />
                        <span className='bg-red-500 px-2 rounded-full absolute -top-3 -right-3 text-white'>{cartItem.length}</span>
                    </div>
                    <div  className='hidden md:block'>
                        <Show when="signed-out">
                            <SignInButton className='bg-red-500 text-white px-3 py-1 mx-3 rounded-md cursor-pointer' />
                        </Show>
                        <Show when="signed-in">
                            <UserButton className='w-14 h-14' />
                        </Show>
                    </div>
                 {
                    openNav ? <HiOutlineMenuAlt3 onClick={()=>setOpenNav(false)} className='h-7 w-7 md:hidden'/> : <HiOutlineMenuAlt1 onClick={()=>setOpenNav(true)} className='h-7 w-7 md:hidden'/>             }

                </nav>
            </div>
            <ResponsiveMenu openNav={openNav} setOpenNav={setOpenNav}/>
        </div>
    )
}
export default Navbar