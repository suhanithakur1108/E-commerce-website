import { createContext, useContext, useState } from "react";
import axios from 'axios';

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
    const [data, setData] = useState();

// fetching all products from api

const fetchAllProducts= async()=>{
    try{
    const response= await axios.get('https://fakestoreapi.com/products')
    console.log(response)
    setData(response.data)
    }
    catch(error){
        console.error(error);   
    }
}
const getUniqueCategory=(data,property)=>{
    let newVal=data?.map((curElem)=>{
        return curElem[property];
    })
     newVal=[...new Set(newVal)]
     return newVal
}

const categoryOnlyData=getUniqueCategory(data,"category")
    return <DataContext.Provider  value={{data,setData ,fetchAllProducts,categoryOnlyData}}>
        {children}
    </DataContext.Provider>
}

export const getData=()=> useContext(DataContext)