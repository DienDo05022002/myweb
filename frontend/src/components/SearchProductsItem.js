import React from 'react';
import { Link } from 'react-router-dom';
import { NumberFormatBase } from 'react-number-format';
import Button from 'react-bootstrap/esm/Button';

const SearchProductsItem = ({ data }) => {
  return (
    <div className="search-link">
      {/* <button> */}
        <Link to={`/product/${data.slug}`} className="">
          <img className="search-img-product" src={data.image} alt="" />
        </Link>

        <Link to={`/product/${data.slug}`} className="search-name-product">
          {data.name}
        </Link>

        <div>
          <NumberFormatBase
            className="search-name-product"
            value={data.price}
            displayType={'text'}
            thousandSeparator={true}
            suffix={'đ'}
          />
          K
        </div>
      {/* </Button> */}
    </div>
  );
};

export default SearchProductsItem;
