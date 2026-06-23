import { UserButton, useUser, Show, SignInButton } from '@clerk/react'
import React from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { Link } from 'react-router'

const ResponsiveMenu = ({ openNav, setOpenNav }) => {
    const { user } = useUser()
     const handleLinkClick = () => {
        setOpenNav(false);  
    };
    const navLinkClass = () => {
        "border-b-2 transition-all border-red-500 cursor-pointer";
    };

    return (
        <div className={`${openNav ? "left-0" : "-left-full"} fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-white px-8 pb-6 pt-16 text-black md:hidden rounded-r-xl shadow-md transition-all`}>
            <div>
                  <div className='flex items-center justify-start gap-3'>
                    <Show when="signed-in">
                        <UserButton size={50} />
                        <div>
                            <h1 className='text-sm text-slate-500'>Welcome, {user?.firstName}</h1>
                        </div>
                    </Show>
                    <Show when="signed-out">
                        <FaUserCircle size={50} className='text-gray-400' />
                        <div>
                            <h1 className='text-sm text-slate-500'>Guest User</h1>
                        </div>
                    </Show>
                </div>

                {/* Sign In Button - Sirf signed-out par */}
                <Show when="signed-out">
                    <div className='mt-4'>
                        <SignInButton className='bg-red-500 text-white px-4 py-2 rounded-md w-full hover:bg-red-600 transition'>
                            Sign In
                        </SignInButton>
                    </div>
                </Show>
                <nav className='mt-12'>
                    <ul className='flex flex-col gap-7 text-2xl font-semibold'>
                        <Link to='/'onClick={handleLinkClick} className={navLinkClass}><li>Home</li></Link>   
                        <Link to='/products' onClick={handleLinkClick}className={navLinkClass}><li>Products</li></Link>                                              
                        <Link to='/about'onClick={handleLinkClick} className={navLinkClass}><li>About</li></Link>
                        <Link to='/contact' onClick={handleLinkClick} className={navLinkClass}><li>Contact</li></Link>
                    </ul>
                </nav>
            </div>

        </div>
    )
}

export default ResponsiveMenu