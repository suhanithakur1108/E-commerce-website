import React, { useContext, useEffect } from 'react'
import { getData } from '../context/DataContext'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
import SlickSlider from "react-slick";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import Category from './Category';
import { useNavigate } from 'react-router';

const Carousel = () => {
    const navigate = useNavigate()
    const { data, fetchAllProducts } = getData()
    useEffect(() => {
        fetchAllProducts()
    }, [])

    var settings = {
        dots: false,
        autoplay: true,
        autoplaySpeed: 2000,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
    };
    const Slider = SlickSlider.default || SlickSlider;
    return (
        <>
            <Slider {...settings}>
                {
                    data?.slice(0, 7)?.map((item, index) => {
                        return (
                            <div key={index} className="bg-linear-to-r from-[#0f0c29] via-[#2F2A5F] to-[#24243e]
                            -z-10">
                                <div className='flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 px-4 py-8 md:py-16 min-h-100 md:min-h-150'>
                                    <div className='flex flex-col items-center md:items-start text-center md:text-left w-full max-w-70 md:max-w-112.5 lg:max-w-125 overflow-hidden mt-4 md:mt-0' >
                                        <h1 className='text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold uppercase line-clamp-3 text-white mb-2 wrap-break-word'>{item.title}</h1>
                                        <p className='md:w-125 w-64  text-gray-400 pr-7 wrap-break-word'>{item.description}</p>
                                        <button onClick={() => navigate(`/products/${item.id}`)} className='bg-linear-to-r from-red-500 to-purple-500 text-white px-3 py-2  rounded-md  mt-2'>Shop Now</button>
                                    </div>
                                    <div className='shrink-0 flex items-center justify-center' >
                                        <img src={item.image} alt={item.title} className='bg-white rounded-full w-[200px] h-[200px] md:w-87.5 md:h-87.5 object-contain shadow-2xl shadow-red-400 p-4'></img>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </Slider>
            <Category />
        </>
    )
}

export default Carousel