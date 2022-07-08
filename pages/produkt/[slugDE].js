import axios from 'axios';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';

import ProductDetails from '../../components/products/ProductDetails';

function ProduktSeiteDE() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});

  const router = useRouter();
  const { locale, query } = router;
  const { slugDE } = query;

  const fetchProduct = async () => {
    try {
      //   console.log(`slugEN: ${typeof slugEN}`);
      if (slugDE !== undefined) {
        setIsLoading(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/products/slug/de/${slugDE}`
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
  }, [slugDE]);

  useEffect(() => {
    if (locale === 'en') {
      // const productIT = dataIT.products.find((x) => x.id === productId);
      const productENSlug = selectedProduct.slugEN;
      //   console.log(productITSlug);
      router.push(`/product/${productENSlug}`);
    }

    if (locale === 'it') {
      const productITSlug = selectedProduct.slugIT;
      router.push(`/prodotto/${productITSlug}`);
    }
  }, [locale]);

  return (
    <div>
      {isLoading ? (
        <div>Produkt nicht gefunden</div>
      ) : (
        <Fragment>
          <ProductDetails
            productName={selectedProduct.nameDE}
            productNameSrc={selectedProduct.image}
            productCategory={selectedProduct.categoryDE}
            productRating={selectedProduct.rating}
            numReviews={selectedProduct.numReviews}
            productDescription={selectedProduct.descriptionDE}
            productPrice={selectedProduct.price}
            productInStock={selectedProduct.countInStock}
          />
        </Fragment>
      )}
    </div>
  );
}

export default ProduktSeiteDE;
