import { useState, useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';

const Cart = () => {

    const {cartItems, food_list, addToCart, removeFromCart, getTotalCartAmount, baseUrl } = useContext(StoreContext);
    const navigate = useNavigate()
    
    const [promoInput, setPromoInput] = useState('');
    const [discountAmount, setDiscountAmount] = useState(0);
    const [isPromoApplied, setIsPromoApplied] = useState(false);

    const totalItemPrice = getTotalCartAmount()
    const cgst = +(getTotalCartAmount()*0.025).toFixed(2)
    const sgst = +(getTotalCartAmount()*0.025).toFixed(2)
    const deliveryFee = 40
    const grandTotal = +(totalItemPrice + cgst + sgst + deliveryFee - discountAmount).toFixed(2);
    
    const handlePromo = () => {
        if (totalItemPrice === 0) {
            alert("Add items to your cart before applying a promo code.");
            return;
        }

        const code = promoInput.trim().toLowerCase(); // accept case-insensitive inputs
        if (isPromoApplied) {
            alert("Promo code already applied.");
            return;
        }

        // "save10" = 10% off total price (including cgst, sgst and delivery charges)
        if (code === "save10") {
            const discount = (totalItemPrice + cgst + sgst + deliveryFee) * 0.10;
            setDiscountAmount(discount);
            setIsPromoApplied(true);
        } else {
            alert("Invalid promo code.");
        }
    };

  return (
    <div className='cart'>
        <div className="cart-items">
            <div className="cart-items-title">
                <p>Items</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Add</p>
                <p>Remove</p>
            </div>
            <br />
            <hr />
            {food_list.map((item, index)=> {
                // cart contains items
                if(cartItems[item._id]>0){
                    return (
                        <div>
                            <div className="cart-items-title cart-items-item">
                                <img src={`${baseUrl}/images/${item.image}`} alt="" />
                                <p>{item.name}</p>
                                <p>₹{item.price}</p>
                                <p>{cartItems[item._id]}</p> 
                                <p>₹{item.price*cartItems[item._id]}</p>
                                <img className='plus' onClick={()=>addToCart(item._id)} src={assets.add_icon_green} alt="" />
                                <img className='minus' onClick={()=>removeFromCart(item._id)} src={assets.remove_icon_red} alt="" />
                            </div>
                            <hr />
                        </div>
                    )
                }
            })}
        </div>
        <div className="cart-bottom">
            <div className="cart-total">
                {totalItemPrice > 0 ? (
                    <div>
                        <h2>Cart Totals</h2>
                        <br />
                        <div className="cart-total-details">
                            <p>Total Item Price</p>
                            <p>₹{totalItemPrice}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>CGST (2.5%)</p>
                            <p>₹{totalItemPrice===0?0:cgst}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>SGST (2.5%)</p>
                            <p>₹{totalItemPrice===0?0:sgst}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>₹{totalItemPrice===0?0:deliveryFee}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p><b>Grand Total</b></p>
                            <div>
                                {discountAmount > 0 ? (
                                    <div className="price-with-discount">
                                        <p className="original-price"><b>₹{totalItemPrice + cgst + sgst + deliveryFee}</b></p>
                                        <p className="discounted-price"><b>₹{grandTotal}</b></p>
                                    </div>
                                ) : (
                                    <p><b>₹{totalItemPrice === 0 ? 0 : grandTotal}</b></p>
                                )}
                            </div>
                        </div>
                        <br />
                        <button onClick={()=> navigate('/order', { state: { cgst, sgst, discountAmount, deliveryFee, grandTotal } })}>Proceed to Checkout</button>
                    </div>
                ):(
                    <p>Your cart is empty.</p>
                )}
            </div>

            {/* Promo code */}
            <div className="cart-promocode">
                <div>
                    <p>Enter the promo code here</p>
                    <div className="cart-promocode-input">
                        <input type="text" placeholder='promo code' value={promoInput} onChange={(e)=>setPromoInput(e.target.value)} />
                        <button onClick={handlePromo}>Submit</button>
                    </div>
                    {discountAmount > 0 && (
                        <p style={{ color: 'green', marginTop: '10px' }}>
                            Promo discount applied: ₹{discountAmount.toFixed(2)}
                        </p>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Cart