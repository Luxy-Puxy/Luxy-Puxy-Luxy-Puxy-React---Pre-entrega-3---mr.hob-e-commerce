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

	const order = {
		buyer: {
			name: "Jean Pierre",
			email: "pierre.alcandre@gmail.com",
			phone: "975130253",
			address: "my-address",
		},
		items: cart.map((product) => ({
			id: product.id,
			title: product.name,
			price: product.price,
			quantity: product.quantity,
		})),
		total: totalPrice(),
	};

	const handleClick = () => {
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
			<p className="total">Total:$ {totalPrice()}</p>
			<button className="buy-button" onClick={handleClick}>
				Buy Now
			</button>
		</div>
	);
};

export default Cart;
