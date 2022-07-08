import axios from 'axios';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';

import ProductDetails from '../../components/products/ProductDetails';

function PaginaProdottoIT() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});

  const router = useRouter();
  const { locale, query } = router;
  const { slugIT } = query;

  const fetchProduct = async () => {
    try {
      //   console.log(`slugEN: ${typeof slugEN}`);
      if (slugIT !== undefined) {
        setIsLoading(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/products/slug/it/${slugIT}`
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
  }, [slugIT]);

  useEffect(() => {
    if (locale === 'en') {
      // const productIT = dataIT.products.find((x) => x.id === productId);
      const productENSlug = selectedProduct.slugEN;
      //   console.log(productITSlug);
      router.push(`/product/${productENSlug}`);
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
        <div>Prodotto non trovato</div>
      ) : (
        <Fragment>
          <ProductDetails
            productName={selectedProduct.nameIT}
            productNameSrc={selectedProduct.image}
            productCategory={selectedProduct.categoryIT}
            productRating={selectedProduct.rating}
            numReviews={selectedProduct.numReviews}
            productDescription={selectedProduct.descriptionIT}
            productPrice={selectedProduct.price}
            productInStock={selectedProduct.countInStock}
          />
        </Fragment>
      )}
    </div>
  );
}

export default PaginaProdottoIT;
