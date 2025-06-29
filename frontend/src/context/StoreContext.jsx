import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
    const baseUrl = import.meta.env.VITE_API_URL;
    const [isLoading, setIsLoading] = useState(true);

    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [food_list, setFoodList] = useState([])

    const addToCart = async (itemId) => {
        if(!cartItems[itemId]){ // item is not added
            setCartItems((prev)=>({...prev,[itemId]:1})) // create new entry for item and set its quantity to 1
        }else{ // item is already added
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1})) // increase item quantity by 1
        }
    
        if(token){ // user is logged in
            await axios.post(`${baseUrl}/api/cart/add`, {itemId}, {headers:{token}}) // add items to db
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))  // decrease item quantity by 1
        // user is logged in
        if(token){
            await axios.post(`${baseUrl}/api/cart/remove`, {itemId}, {headers:{token}}) // remove items from db
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }

        return totalAmount;
    }

    const fetchFoodList = async () => {
        const response = await axios.get(`${baseUrl}/api/food/list`)
        setFoodList(response.data.data)
    }

    const loadCartData = async (token) => {
        const response = await axios.post(`${baseUrl}/api/cart/get`,{},{headers:{token}})
        setCartItems(response.data.cartData);
    }
    
    // this side effect helps not to logout automatically when refreshing page
    // it also clears the cart and removes the flag ("cartCleared") from local storage, if flag is true
    useEffect(() => {
        async function loadData(){
            await fetchFoodList()

            const cartCleared = localStorage.getItem("cart_cleared");
            
            if(token && cartCleared !== "true"){
                await loadCartData(token)
            } else if (cartCleared === "true") {
                setCartItems({});
                localStorage.removeItem("cart_cleared");
            }
            setIsLoading(false);
        }
        loadData();
    }, [token])
    
    if(isLoading){
        return <div>Loading...</div>
    }

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        baseUrl,
        token,
        setToken,
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider
