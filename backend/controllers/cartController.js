import userModel from '../models/userModel.js'

// add items to user cart
const addToCart = async (req, res) => {
    try{
        const userId = req.user.id; // req.user comes from authMiddleware
        const { itemId } = req.body;
        // let userData = await userModel.findOne({_id:userId})
        let userData = await userModel.findById(userId)
        let cartData = await userData.cartData;
        if(!cartData[itemId]){
            cartData[itemId] = 1;
        }
        else{
            cartData[itemId]++;
        }
        await userModel.findByIdAndUpdate(userId, {cartData})
        res.json({success: true, message: "Added item to cart"})
    }
    catch(error){
        console.log(error);
        res.json({success: false, message: "Error"})
    }
}

// remove items from user cart
const removeFromCart = async (req, res) => {
    try{
        const userId = req.user.id; // req.user comes from authMiddleware
        const { itemId } = req.body;
        // let userData = await userModel.findOne({_id:userId})
        let userData = await userModel.findById(userId)
        let cartData = await userData.cartData;
        if(cartData[itemId]>0){
            cartData[itemId]--;
        }
        await userModel.findByIdAndUpdate(userId, {cartData})
        res.json({success: true, message: "Removed item from cart"})
    }
    catch(error){
        console.log(error);
        res.json({success: false, message: "Error"})
    }
}

// fetch user cart data
const getCart = async (req, res) => {
    try{
        const userId = req.user.id; // req.user comes from authMiddleware
        // let userData = await userModel.findOne({_id:userId})
        let userData = await userModel.findById(userId)
        let cartData = await userData.cartData;
        res.json({success: true, cartData})
    }
    catch(error){
        console.log(error);
        res.json({success: false, message: "Error"})
    }
}

export {addToCart, removeFromCart, getCart}