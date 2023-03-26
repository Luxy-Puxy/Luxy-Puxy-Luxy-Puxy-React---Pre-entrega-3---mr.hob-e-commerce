import { Link } from "react-router-dom";
import Cartwidget from "../CartWidget/Cartwidget";
import './Navbar.css';


export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        mr. Hob
      </Link>
      <ul>
        <li>
          <Link to="/myaccount">My Account</Link>
        </li>
        <li>
          <Link to="/category/TCG">TCG</Link>
        </li>
        <li>
        <Link to="/category/BoardGames">BoardGames</Link>
        </li>
        <li>
         
          <Link to="/cart">
            <Cartwidget />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
