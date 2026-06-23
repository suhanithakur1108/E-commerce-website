import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import Loading from '../assets/Loading4.webm'
import { ChevronLeftIcon } from 'lucide-react'
import ProductListView from '../components/ProductListView'
import axios from 'axios'

const CategoryProduct = () => {
  const navigate = useNavigate()
  const [searchData, setSearchData] = useState([])
  const params = useParams()
  const category = params.Category
 

 const getFilteredData = async () => {
  try {
    const res = await axios.get(`https://fakestoreapi.com/products/category/${category}`)
    const data = res.data  
    setSearchData(data)
  }
  catch (error) {
    console.log(error)
    setSearchData([]) 
  }
}
  useEffect(() => {
    getFilteredData()
    window.scrollTo(0,0)
  }, [])

  return (
    <div>
      {
        searchData?.length > 0 ? (
          <div className='max-w-6xl mx-auto mt-10 mb-10 px-4'>
            <button onClick={()=>navigate('/') } className='bg-gray-800 mb-5 text-white px-3 py-1 rounded-md cursor-pointer flex gap-1 items-center'><ChevronLeftIcon />Back</button>
            {
              searchData.map((products, index) => {
                return <ProductListView key={index} product={products} /> 
              })
            }
          </div>
        ) : (
          <div className='flex items-center justify-center h-100'>
            <video muted autoPlay loop>
              <source src={Loading} type='video/webm' />
            </video>
          </div>
        )
      }
    </div>
  )
}

export default CategoryProduct