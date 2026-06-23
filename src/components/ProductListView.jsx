import React from 'react'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router'

const ProductListView = ({product}) => {
    const navigate=useNavigate()

    const { addToCart}=useCart()
  return (
    <div className='space-y-4 mt-2 rounded-md '>
        <div className='bg-gray-100 flex gap-7 items-center p-2 rounded-md'>
            <img src={product.image} alt={product.title} className=' md:h-60 w-60 h-30  rounded-md  cursor-pointer' onClick={()=>navigate(`/products/${product.id}`)}/>
            <div className='space-y-2'>
                <h1 className='font-bold md:text-xl text-lg line-clamp-3 hover:text-red-400 md: w-full '>{product.title}</h1>
                <p className='font-semibold flex items-center md:text-lg text-sm'><span className=' md:text-4xl text-xl '>${product.price}</span></p>
                <p>FREE delivery <span className=' font-semibold'>Fri, 1 July</span>  <br/>
                    or fastest delivery  <span className='font-semibold'>25 June</span>
                </p>
                <button onClick={()=>addToCart(product)} className='bg-red-500 text-white px-3 py-1 rounded-md'>Add to Cart</button>
            </div>
        </div>
    </div>
  )
}

export default ProductListView