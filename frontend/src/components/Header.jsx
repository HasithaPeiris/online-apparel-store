import React from 'react'
import Badge from '@mui/material/Badge';
import {ShoppingCartOutlined, AccountCircle} from '@mui/icons-material';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './header.css';

export default function () {
    const quantity = useSelector(state=>state.cart.quantity)

  return (
    <div className='header'>
        <Link to="/">
        <div className="logo">
            <img src="logo.png" alt="KRO Logo"/>
        </div>
        </Link>
        <nav>
            <ul>
                <li><a href="#">HOME</a></li>
                <li><a href="#">PRODUCTS</a></li>
                <li><a href="#">BLOG</a></li>
                <li><a href="#">ABOUT</a></li>
                <li><a href="#">ACCOUNT</a></li>
                <Link to="/cart">
                <li>
                    <Badge badgeContent={quantity} color="secondary">
                        <ShoppingCartOutlined className ="cartIcon" color="action" />
                    </Badge>
                </li>
                </Link>
            </ul>
        </nav>
    </div>
  )
}
