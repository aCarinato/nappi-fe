import axios from 'axios';
import { useEffect, useState } from 'react';

import ProductList from '../components/products/ProductList';

import { useMainContext } from '../context/Context';

function HomePage() {
  const { productsData, setProductsData } = useMainContext();

  const [isLoading, setIsLoading] = useState(false);

  // const [products, setProducts] = useState([]);

  const fetchMessage = async () => {
    // let message;
    let resData;
    try {
      setIsLoading(true);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/products/`);
      resData = res.data.products;
      // console.log(res.data);
      // setProducts(resData);
      setProductsData(resData);

      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMessage();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>Loading merda</div>
      ) : (
        <>
          <ProductList products={productsData} />
        </>
      )}
    </div>
  );
}

export default HomePage;
