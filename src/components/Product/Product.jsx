import React from 'react';
import PropTypes from 'prop-types';
import './Product.scss';

const Product = ({ name, price, onClick }) => (
  <button type="button" className="product" onClick={onClick}>
    <div className="product__wrapper">
      <h2 className="Product__name">{name}</h2>
      <span className="product__price">
        {price}
        €
      </span>
    </div>
  </button>
);

Product.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onClick: PropTypes.func,
};

Product.defaultProps = {
  onClick: () => {},
};


export default Product;
