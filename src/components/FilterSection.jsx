import React from 'react'
import { getData } from '../context/DataContext'

const FilterSection = ({search,setSearch,priceRange,setPriceRange,category,setCategory,handleCategoryChange}) => {
  const{categoryOnlyData}=getData()

  return (
    <div className='bg-gray-100 mt-10 p-4 rounded-md h-max hidden md:block'>
      <input placeholder='Search..' onChange={(e)=>setSearch(e.target.value)} name="" value={search} className='bg-white p-2 rounded-md border-gray-200'/>
    
    {/* category only data */}
    <h1 className='mt-5 font-semibold  text-xl'>Category</h1>
    <div className='flex flex-col gap-2 mt-3'>
    {
   categoryOnlyData?.map((item,index)=>{
    return <div key={index} className='flex gap-2'>
      <input type='checkbox' name={item} checked={category===item} value={item} onChange={handleCategoryChange}/>
      <button className='cursor-pointer uppercase'>{item}</button>
    </div>
   })
  
  }
    </div>
  
 <h1 className='mt-5 font-semibold  text-xl mb-3'>Price range</h1>
<div className='flex flex-col gap-2'>
<label >Price Range :${priceRange[0]} -${priceRange[1]}</label>
<input type="range" name="" min="0" max="5000" value={priceRange[1]} onChange={(e)=>setPriceRange([priceRange[0], Number(e.target.value)])}/>
</div>
<button className='bg-red-500 text-white rounded-md px-3 py-1 mt-5' onClick={()=>{setSearch(""); setCategory("All");setPriceRange([0,5000])}}>Reset Filters</button>
    </div>  

  

    
 
 

 

   


  )
}

export default FilterSection