import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// placing user order for frontend
const placeOrder = async(req,res) => {
    try{
        const userId = req.user.id;
        const { items, address, cgstAmount, sgstAmount, discountAmount = 0, deliveryAmount, totalAmount } = req.body;

        const newOrder = new orderModel({
            userId,
            items,
            amount: totalAmount,
            discountAmount: discountAmount,
            address,
        })

        await newOrder.save(); // save order in db
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}}); // delete user cart data
        
        // add items
        const line_items = items.map((item)=>({
            price_data:{
                currency: "inr",
                product_data: { name:item.name },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))
        
        // add CGST (2.5%)
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: { name: "CGST (2.5%)" },
                unit_amount: Math.round(cgstAmount * 100),
            },
            quantity: 1,
        });

        // add SGST (2.5%)
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: { name: "SGST (2.5%)" },
                unit_amount: Math.round(sgstAmount * 100),
            },
            quantity: 1,
        });

        // add delivery charges
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: { name:"Delivery charges" },
                unit_amount: deliveryAmount * 100,
            },
            quantity: 1,
        })
        
        // Create Stripe session config
        const sessionConfig = {
            line_items,
            mode: "payment",
            success_url: `${process.env.FRONTEND_URL}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${process.env.FRONTEND_URL}/verify?success=false&orderId=${newOrder._id}`,
        };

        // apply discount if discountAmount > 0
        if (discountAmount > 0) {
            sessionConfig.discounts = [{
                promotion_code: 'promo_1RebO4P6y1QRA31gzZ4k6Itd',
            }];
        }

        // Create Stripe session
        const session = await stripe.checkout.sessions.create(sessionConfig);

        res.json({success:true, session_url:session.url})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

const verifyOrder = async (req, res) => {
    const {orderId, success} = req.body
    try{
        // payment is successful
        if(success=="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true}) // update payment to true
            res.json({success:true, message:"Paid"})
        }
        else{
            await orderModel.findByIdAndDelete(orderId) // delete order
            res.json({success:false, message:"Not Paid"})
        }
    }
    catch(error){
        console.log(error)
        res.json({success:false, message:"Error"})
    }
}

// user orders for frontend
const userOrders = async (req, res) => {
    try{
        const userId = req.user.id;
        const orders = await orderModel.find({userId}).sort({createdAt:-1})
        res.json({success:true, data:orders})
    }
    catch(error){
        console.log(error)
        res.json({success:false, message:"Error"})
    }
}

// listing orders for admin panel
const listOrders = async (req, res) => {
    try{
        const orders = await orderModel.find({}); // get all orders
        res.json({success:true,data:orders})
    }
    catch(error){
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

// api for updating order status
const updateStatus = async (req, res) => {
    try{
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status}) // find orderId and update status
        res.json({success:true,message:"Status updated"})
    }
    catch(error){
        console.log(error)
        res.json({success:false, message:"Error"})
    }
}

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus }
