import axios from 'axios';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';

import ProductDetails from '../../components/products/ProductDetails';

import { useMainContext } from '../../context/Context';

function ProductPageEN() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});

  const router = useRouter();
  const { locale, query } = router;
  const { slugEN } = query;

  const fetchProduct = async () => {
    try {
      //   console.log(`slugEN: ${typeof slugEN}`);
      if (slugEN !== undefined) {
        setIsLoading(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/products/slug/${slugEN}`
        );
        const resData = res.data;
        setSelectedProduct(resData);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [slugEN]);

  return (
    <div>
      {isLoading ? (
        <div>Product not found</div>
      ) : (
        <Fragment>
          <ProductDetails
            productName={selectedProduct.nameEN}
            productNameSrc={selectedProduct.image}
            productCategory={selectedProduct.categoryEN}
            productRating={selectedProduct.rating}
            numReviews={selectedProduct.numReviews}
            productDescription={selectedProduct.descriptionEN}
            productPrice={selectedProduct.price}
            productInStock={selectedProduct.countInStock}
          />
        </Fragment>
      )}
    </div>
  );
}

export default ProductPageEN;
