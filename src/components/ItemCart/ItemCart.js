import React from 'react';
import { useCartContext } from '../../context/CartContext';
import './ItemCart.css';

const ItemCart = ({ product }) => {
    const { removeProduct } = useCartContext();
    return (
        <div className='itemCart'>
            <img src={product.image} alt={product.name} />
            <div>
                <p>{product.name}</p>
                <p>Quantity: {product.quantity}</p>
                <p>Unit Price: ${product.price}</p>
                <p>Sub-total: ${product.quantity * product.price}</p>
                <button onClick={() => removeProduct(product.id)}>Eliminar</button>
            </div>
        </div>
    )
}

export default ItemCart