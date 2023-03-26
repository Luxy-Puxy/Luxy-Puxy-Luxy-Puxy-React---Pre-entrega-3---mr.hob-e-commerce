import React from 'react';
import { Link } from 'react-router-dom';
import './Item.css';


const Item = ({ info }) => {
  return (
    <Link to={`/item/${info.id}`} className="BoardGames">
      <img src={info.image} alt="" />
      <p>{info.name}</p>
    </Link>
  );
}

export default Item;
