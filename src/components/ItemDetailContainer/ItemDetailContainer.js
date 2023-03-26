import React, { useState, useEffect } from 'react';
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useParams } from 'react-router-dom';
import ItemDetail from '../ItemDetail/ItemDetail';



const ItemDetailContainer = () => {
	const [data, setData] = useState({});
	const { detalleId } = useParams();

	useEffect(() => {
		const querydb = getFirestore();
		const queryDoc = doc(querydb, "products", detalleId);
		getDoc(queryDoc).then((res) => setData({ id: res.id, ...res.data() }));
	}, [detalleId]);

	return <ItemDetail data={data} />;
};

export default ItemDetailContainer;

