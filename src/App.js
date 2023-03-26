import { Routes, Route } from "react-router-dom";
import Navbar from './components/navbar/Navbar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import Cart from "./components/pages/Cart"
import MyAccount from "./components/pages/MyAccount"
import CartProvider from './context/CartContext';

function App() {
  return (
    <div className="App">
      <CartProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<ItemListContainer />} />
        <Route path="/category/:categoriaId" element={<ItemListContainer />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/myaccount" element={<MyAccount />} />
        <Route path="/item/:detalleId" element={<ItemDetailContainer />} />
        </Routes>
      </CartProvider>
    </div>
  );
}

export default App;
