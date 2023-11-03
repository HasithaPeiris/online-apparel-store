import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import {Add, Edit, Delete} from '@mui/icons-material';
import {productData} from "../../dummyData"
import { Publish } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import { deleteProduct} from "../../redux/apiCalls";
import { useDispatch} from "react-redux";
import { colors } from "@mui/material";

export default function Product() {

    const dispatch = useDispatch();

    const handleDelete = (id) => {
      deleteProduct(id, dispatch);
    };

    const location = useLocation();
    const productId = location.pathname.split("/")[2];
    const [pStats, setPStats] = useState([]);

    const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
    );

    const MONTHS = useMemo(
        () => [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Agu",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        []
    );

    useEffect(() => {
        const getStats = async () => {
          try {
            const res = await userRequest.get("orders/income?pid=" + productId);
            const list = res.data.sort((a,b)=>{
                return a._id - b._id
            })
            list.map((item) =>
              setPStats((prev) => [
                ...prev,
                { name: MONTHS[item._id - 1], Sales: item.total },
              ])
            );
          } catch (err) {
            console.log(err);
          }
        };
        getStats();
    }, [productId, MONTHS]);

    return (
      <div className="product">
        <div className="productContainer">
          <div className="productTitleContainer">
            <span className="productTitle">Product Info.</span>
            <div className="buttons">
              <Link to="/newproduct">
                <Add className="mIcons"/>
              </Link>
              <Link to={"/updateProduct/" + product._id}>
                <Edit className="mIcons"/>
              </Link>
              <Link to="/deleteproduct">
                <Delete className="mIcons" onClick={() => handleDelete(product._id)}/>
              </Link>
            </div>
          </div>
          <div className="productTop">
              <div className="productTopLeft">
                  <Chart data={pStats} dataKey="Sales" title="Sales Performance"/>
              </div>
              <div className="productTopRight">
                  <div className="productInfoTop">
                      <img src= {product.img}
                      alt="" className="productInfoImg" />
                  </div>
                  <div className="productInfoBottom">
                      <span className="productName">{product.title}</span>
                      <div className="productInfoItem">
                          <span className="productInfoKey">ID:</span>
                          <span className="productInfoValue">{product._id}</span>
                      </div>
                      <hr/>
                      <div className="productInfoItem">
                          <span className="productInfoKey">CATEGORY:</span>
                          <span className="productInfoValue">{product.categories}</span>
                      </div>
                      <hr/>
                      <div className="productInfoItem">
                          <span className="productInfoKey">PRICE:</span>
                          <span className="productInfoValue">{product.price}</span>
                      </div>
                      <hr/>
                      <div className="productInfoItem">
                          <span className="productInfoKey">COLOR:</span>
                          <span className="productInfoValue">{product.color}</span>
                      </div>
                      <hr/>
                      <div className="productInfoItem">
                          <span className="productInfoKey">SIZE:</span>
                          <span className="productInfoValue">{product.size}</span>
                      </div>
                      <hr/>
                      <div className="productInfoItem">
                          <span className="productInfoKey">IN STOCK:</span>
                          <span className="productInfoValue">{product.inStock}</span>
                      </div>
                      <hr/>
                      <div className="productInfoItem">
                          <span className="productInfoKey">DESCRIPTION:</span>
                          <span className="productInfoValue">{product.desc}</span>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </div>
    );
}