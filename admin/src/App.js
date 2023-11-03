import {BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./app.css";
import Home from "./pages/home/Home";
import UserList from './pages/userList/UserList';
import User from './pages/user/User';
import NewUser from './pages/newUser/NewUser';
import ProductList from './pages/productList/ProductList';
import Product from './pages/product/Product';
import NewProduct from './pages/newProduct/NewProduct';
import Login from './pages/login/Login';
import { useSelector } from 'react-redux';
import UpdateProduct from './pages/updateProduct/UpdateProduct';


function App() {

  // const admin = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.isAdmin;
  const admin = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NTBmYTczZGU0MWM3YmFjNjZjOTg2MCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4Mzg1NDEzNSwiZXhwIjoxNjg0MTEzMzM1fQ.AnIrkrtY0S_Xf4XWc8M18wU9LBRbawHH2dLR2pnakUg"
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={admin ? <Navigate to ="/"/> : <Login/>} exact />
        </Routes>
          {admin &&(
          <>
            <Topbar/>
            <div className="container">
              <Sidebar/>
              <Routes>
                <Route path="/" element={<Home/>} exact />
                <Route path="/users" element={<UserList/>} exact />
                <Route path="/user/:userId" element={<User/>} exact />
                <Route path="/newUser" element={<NewUser/>} exact />
                <Route path="/products" element={<ProductList/>} exact />
                <Route path="/product/:productId" element={<Product/>} exact />
                <Route path="/newProduct" element={<NewProduct/>} exact />
                <Route path="/updateProduct/:productId" element={<UpdateProduct/>} exact />
              </Routes>
            </div>
          </>
          )}
      </BrowserRouter>
    </div>
  );
}

export default App;
