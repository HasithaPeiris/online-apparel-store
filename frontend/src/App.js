import {BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Success from './pages/Success';
import { useSelector } from "react-redux";
import './app.css';
import Products from './components/Products';

function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <div>
      <BrowserRouter>
        <div className='pages'>
            
          <Routes>
            <Route path="/" element={<Home/>} exact />
            <Route path="/products/:category" element={<ProductList/>} exact />
            <Route path="/product/:id" element={<Product/>} exact />
            <Route path="/products" element={<Products/>} exact />
            <Route path="/cart" element={<Cart/>} exact />
            <Route path="/success" element={<Success/>} exact />
            <Route
              path="/login"
              element={user ? <Navigate to ="/"/> : <Login/>} exact
            />
            <Route
              path="/register"
              element={user ? <Navigate to ="/"/> : <Register/>} exact />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
