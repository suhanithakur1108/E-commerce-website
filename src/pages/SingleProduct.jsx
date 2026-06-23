import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import Loading from "../assets/Loading4.webm"
import Breadcrumbs from '../components/Breadcrumbs'
import { IoCartOutline } from 'react-icons/io5'
import { useCart } from '../context/CartContext'

const SingleProduct = () => {

    const params = useParams()
    const [SingleProduct, setSingleProduct] = useState("")
    const{addToCart}=useCart()

    const getSingleProduct = async () => {
        try {
            const resp = await axios.get(`https://fakestoreapi.com/products/${params.id}`)

            const product = resp.data
            setSingleProduct(product)
            // console.log(product)
        }
        catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        getSingleProduct()
        window.scrollTo(0,0)
    }, [])


    return (
        <>
            {
                SingleProduct ? <div className='px-4 pb-4 md:px-0'>
                    <Breadcrumbs title={SingleProduct.title}/>
                    <div className='max-w-6xl mx-auto md:p-6 grid-cols-1 md:grid-cols-2 gap-10'>
                        {/* {product image} */}
                        <div className='w-full '>
                            <img src={SingleProduct.image} alt={SingleProduct.title} className='rounded-2xl w-full h-75 md:h-100 object-contain'/>
                        </div>
                        {/* prodcut details */}
                        <div className='flex flex-col gap-6'>
                            <h1 className='md:text-3xl font-bold text-gray-800'>{SingleProduct.title}</h1>
                            <h1 className='text-gray-700 font-semibold'>{SingleProduct.category?.toUpperCase()}</h1>
                            <p className='font-semibold text-red-500'>${SingleProduct.price}</p>
                            <p className='text-gray-600'>{SingleProduct.description}</p>
                            {/* qaunatity selector */}
                            <div className='flex items-center' gap-4>
                                <label htmlFor='' className='text-sm font-medium text-gray-700'>Quantity:</label>
                                <input type="number" min={1} defaultValue={1} className='w-20 border border-gray-300 rounded-e-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-red-500 caret-transparent'/>
                            </div>
                            <div className='flex gap-4 mt-4'>
                                <button onClick={()=>(addToCart(SingleProduct))} className='px-6 flex gap-2 py-2 text-lg bg-red-500 text-white rounded-md'><IoCartOutline className='w-6 h-6 '/> Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div> :
                  <div className='flex items-center justify-center h-screen'>
                              <video muted autoPlay loop className='w-60 h-60 object-contain' >
                                <source src={Loading} type='video/webm' />
                              </video>
                            </div>
            }


        </>
    )
}

export default SingleProduct