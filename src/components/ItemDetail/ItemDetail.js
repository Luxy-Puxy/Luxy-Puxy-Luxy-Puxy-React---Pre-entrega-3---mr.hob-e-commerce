import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";
import ItemCount from "../ItemCount/ItemCount";
import "./ItemDetail.css";

const ItemDetail = ({ data }) => {
  const [goToCart, setGoToCart] = useState(false);
	const { addProduct } = useCartContext();

	const onAdd = (quantity) => {
		setGoToCart(true);
		addProduct(data, quantity);
	};
  return (
    <div className="container">
      <div className="detail">
        <img className="detail__image" src={data.image} alt="" />
        <div className="content">
          <h1>{data.name}</h1>
          {goToCart ? (
						<Link to="/cart"> Go to Cart</Link>
					) : (
						<ItemCount initial={1} stock={45} onAdd={onAdd} />
					)}
        </div>
      </div> {}
      <div className="description">
        <p>{data.description}</p>
      </div>
    </div>
  );
};

export default ItemDetail;