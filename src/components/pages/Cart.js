import { useState } from "react";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import React from "react";
import { Link } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";
import ItemCart from "../ItemCart/ItemCart";
import "./Cart.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const { cart, totalPrice } = useCartContext();

  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [buyerAddress, setBuyerAddress] = useState("");

  const order = {
    buyer: {
      name: buyerName,
      email: buyerEmail,
      phone: buyerPhone,
      address: buyerAddress,
    },
    items: cart.map((product) => ({
      id: product.id,
      title: product.name,
      price: product.price,
      quantity: product.quantity,
    })),
    total: totalPrice(),
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      toast.error("Cart is empty. Please add products to cart first.");
      return;
    }

    const db = getFirestore();
    const ordersCollection = collection(db, "orders");
    addDoc(ordersCollection, order)
      .then(({ id }) => {
        console.log(id);
        toast.success("Order placed successfully!");
      })
      .catch((error) => {
        console.error("Error placing order: ", error);
        toast.error("Error placing order. Please try again.");
      });
  };

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <p>Cart Empty</p>
        <Link to="/">Add Products to Cart</Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <ToastContainer />
      <div className="cart-items-container">
        {cart.map((product) => (
          <ItemCart key={product.id} product={product} />
        ))}
      </div>
      <form className="buyer-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={buyerName}
          onChange={(e) => setBuyerName(e.target.value)}
		  required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={buyerEmail}
          onChange={(e) => setBuyerEmail(e.target.value)}
		  required
        />

        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          id="phone"
          value={buyerPhone}
          onChange={(e) => setBuyerPhone(e.target.value)}
		  required
        />

        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          value={buyerAddress}
          onChange={(e) => setBuyerAddress(e.target.value)}
		  required
        />

        <p className="total">Total:$ {totalPrice()}</p>
        <button className="buy-button" type="submit">
          Buy Now
        </button>
      </form>
    </div>
  );
};

export default Cart;
