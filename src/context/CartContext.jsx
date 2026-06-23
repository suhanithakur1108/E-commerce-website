import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify"

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {

  const [cartItem, setCartItem] = useState(() => {
    const storedCart = localStorage.getItem('cartItem')
    return storedCart ? JSON.parse(storedCart) : []
  })


  useEffect(() => {
    localStorage.setItem('cartItem', JSON.stringify(cartItem))
  }, [cartItem])

    const addToCart = (product) => {
        const itemInCart = cartItem.find((item) => item.id === product.id)
        if (itemInCart) {
            const updatedCart = cartItem.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
                ;
            setCartItem(updatedCart)
            toast.success("Product quantity increased...")
        }
        else {
            // add new itm with quantity 1
            setCartItem([...cartItem, { ...product, quantity: 1 }])
            toast.success("Product is added to cart")

        }

    }

    const updateQuantity=(cartItem,productId,action)=>{
       setCartItem(cartItem.map(item =>{
            if(item.id===productId){
                let newUnit=item.quantity;
                if(action==='increase'){
                    newUnit=newUnit+1
                    toast.success("Quantity is increased")
                }
                else if(action==='decrease'){
                    newUnit=newUnit-1
                     toast.success("Quantity is decreased")
                }
        return newUnit >0 ? {...item,quantity:newUnit}:null
            }
            return item
        }).filter(item=>item !=null) 
        
     ) 
    }

    const deleteItem=(productId)=>{
     setCartItem(cartItem.filter(item=> item.id !=productId))
      toast.success("Product removed from cart")
    }

 const clearCart = () => {
        setCartItem([]);
        localStorage.removeItem('cartItem');
       
    };

    return (
    <CartContext.Provider value={{ cartItem, setCartItem, addToCart, updateQuantity, deleteItem ,clearCart}}>
      {children}
    </CartContext.Provider>
  )
}
export const useCart = () => useContext(CartContext)