import classes from './ProductList.module.css';
import ProductItem from './ProductItem';

function ProductList(props) {
  const { products } = props;
  return (
    <div>
      {products.map((product) => (
        <ProductItem key={product._id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
