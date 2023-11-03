import React from 'react'
import "./productList.css";
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline, AddCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../redux/apiCalls";
import { useEffect } from "react";

export default function ProductList() {

    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);

    useEffect(() => {
      getProducts(dispatch);
    }, [dispatch]);

    const handleDelete = (id) => {
      deleteProduct(id, dispatch);
    };

    const columns = [
        { field: '_id', headerName: 'PRODUCT ID', width: 250 },
        { field: 'product', headerName: 'PRODUCT', width: 250, renderCell: (params)=>{
            return(
                <div className="productListItem">
                    <img className="productListImg" src={params.row.img} alt="" />
                    {params.row.title}
                </div>
            )
        } },
        
        { field: 'inStock', headerName: 'STOCK', width: 150 },
       
        {
            field: 'price',
            headerName: 'PRICE',
            width: 160,
        },
        {
            field: 'action',
            headerName: 'ACTION',
            width: 150,
            renderCell: (params)=>{
                return (
                    <>
                      <Link to={"/product/" + params.row._id}>
                        <button className="productListEdit">EDIT</button>
                      </Link>
                      <DeleteOutline
                        className="productListDelete"
                        onClick={() => handleDelete(params.row._id)}
                      />
                    </>
                );
            }
        },
        
    ];

  return (
    <div className='productList'>
      <div className='productListContainer'>
        <div className='pageHeader'>
          <span className="title">Products</span>
          <Link to="/newproduct">
            {/* <button className='addBtn'>ADD PRODUCT</button> */}
            <AddCircle className='add'/>
          </Link>
        </div>
        <div className='dataGrid'>
          <DataGrid
            rows={products}
            disableRowSelectionOnClick
            columns={columns}
            getRowId={(row) => row._id}
            //paginationModel={{ page: 0, pageSize: 8 }}
            pageSize = {8}
            checkboxSelection
          />
        </div>
      </div>
    </div>
  )
}
