import React, { useState } from 'react'
import styled from "styled-components";
import Header from "../components/Header";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation } from 'react-router-dom';

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;

const Option = styled.option``;

export default function ProductList() {
  const location = useLocation();
  const cat = (location.pathname.split("/")[2])
  const [filters, setFilters] = useState({})
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  return (
    <Container>
        {/* <Navbar /> */}
        <Header/>
        <Announcement />
        <Title>{cat}</Title>
        <FilterContainer>
            <Filter>
                <FilterText>Filter Products:</FilterText>
                <Select name="color" onChange={handleFilters}>
                    <Option disabled>
                    Color
                    </Option>
                    <Option>White</Option>
                    <Option>Black</Option>
                    <Option>Red</Option>
                    <Option>Gray</Option>
                    <Option>Brown</Option>
                    <Option>Yello</Option>
                </Select>
                <Select name="size" onChange={handleFilters}>
                    <Option disabled>
                    Size
                    </Option>
                    <Option>S</Option>
                    <Option>M</Option>
                    <Option>L</Option>
                    <Option>XL</Option>
                    <Option>XXL</Option>
                </Select>
                </Filter>
                <Filter>
                <FilterText>Sort Products:</FilterText>
                <Select onChange={(e) => setSort(e.target.value)}>
                    <Option value="newest">Newest</Option>
                    <Option value="asc">Price (asc)</Option>
                    <Option value="desc">Price (desc)</Option>
                </Select>
            </Filter>
        </FilterContainer>
        <Products cat={cat} filters={filters} sort={sort}/>
        {/* <Newsletter /> */}
        <Footer />
    </Container>
  )
}
