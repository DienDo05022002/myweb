import React from 'react';
import { Link } from 'react-router-dom';
import {NumberFormatBase}  from "react-number-format";

const SearchProductsItem = ({ data }) => {
  return (
    <div className='search-link'>
      <Link
        to={`/product/${data.slug}`}
        className=""
      >
        <img
          className="search-img-product"
          src={data.image}
          alt=''
        />
      </Link>

      <Link
        to={`/product/${data.slug}`}
        className="search-name-product"
      >
        {data.name}
      </Link>

      <div>
        <NumberFormatBase 
            className="search-name-product"
            value={data.price}
            displayType={"text"}
            thousandSeparator={true}
            suffix={"đ"}
        />K
      </div>
    </div>
  );
};

export default SearchProductsItem;
