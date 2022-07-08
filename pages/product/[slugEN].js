import axios from 'axios';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';

import ProductDetails from '../../components/products/ProductDetails';

// import { useMainContext } from '../../context/Context';

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
          `${process.env.NEXT_PUBLIC_API}/products/slug/en/${slugEN}`
        );
        const resData = res.data;
        // console.log(resData);
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

  useEffect(() => {
    if (locale === 'it') {
      // const productIT = dataIT.products.find((x) => x.id === productId);
      const productITSlug = selectedProduct.slugIT;
      console.log(productITSlug);
      router.push(`/prodotto/${productITSlug}`);
    }

    if (locale === 'de') {
      // const productIT = dataIT.products.find((x) => x.id === productId);
      const productDESlug = selectedProduct.slugDE;
      //   console.log(productITSlug);
      router.push(`/produkt/${productDESlug}`);
    }
  }, [locale]);

  return (
    <div>
      {isLoading ? (
        <div>Product not found</div>
      ) : (
        <Fragment>
          <ProductDetails
            product={selectedProduct}
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
