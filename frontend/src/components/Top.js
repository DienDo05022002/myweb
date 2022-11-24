import React from 'react'
import { Link } from 'react-router-dom';
import { useContext, memo } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Top = ({product}) => {
    console.log({product})
  return (
    <div className='Topcss-container'>
        <Card className='Topcss-card'>
          <Link to={`/product/${product.slug}`}>
            <img src={product.image} alt={product.name} className='Topcss-img'/>
          </Link>
          <Link to={`/product/${product.slug}`} className='Topcss-name'>
              <p className='Topcss-name-p'>{product.name}</p>
            </Link>
            <Card.Text className="Topcss-price">
                <span className='Topcss-span'>₫</span>{product.price}{'.000'}
            </Card.Text>
        </Card>
    </div>
  )
}

export default memo(Top)