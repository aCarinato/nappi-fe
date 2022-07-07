import classes from './ProductList.module.css';
import ProductItem from './ProductItem';
import { Fragment } from 'react';

function ProductList(props) {
  const { products } = props;
  return (
    <div className={classes.container}>
      {products.map((product) => (
        <ProductItem key={product._id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
