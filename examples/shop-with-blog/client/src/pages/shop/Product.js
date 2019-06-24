import React from 'react';
import PropTypes from 'prop-types';
import { ProductQuery, Product } from '@deity/falcon-ecommerce-uikit';

const ProductPage = ({ id, path }) => (
  <ProductQuery variables={{ id, path }}>{productProps => <Product {...productProps} />}</ProductQuery>
);
ProductPage.propTypes = {
  id: PropTypes.string.isRequired
};

export default ProductPage;
