import classes from './ProductItem.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

import BtnCTA from '../UI/BtnCTA';
// context
import { Store } from '../../context/Store';
import { useContext } from 'react';

function ProductItem(props) {
  const { product } = props;

  const router = useRouter();
  const { locale } = router;

  const { state, dispatch } = useContext(Store);

  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product.countInStock < quantity) {
      if (locale === 'en') alert('Sorry. Product out of stock');
      if (locale === 'it') alert('Prodotto esaurito');
      if (locale === 'de') alert('Es tut uns leid. Produkt nicht auf Lager');
      return;
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
  };

  return (
    <div className={classes.container}>
      <div className={classes.imageContainer}>
        {locale === 'en' && (
          <Link href={`/product/${product.slugEN}`}>
            <a>
              <img
                className={classes.image}
                src={product.image}
                alt={product.nameEN}
              />
            </a>
          </Link>
        )}
        {locale === 'it' && (
          <Link href={`/prodotto/${product.slugIT}`}>
            <a>
              <img
                className={classes.image}
                src={product.image}
                alt={product.nameIT}
              />
            </a>
          </Link>
        )}
        {locale === 'de' && (
          <Link href={`/produkt/${product.slugDE}`}>
            <a>
              <img
                className={classes.image}
                src={product.image}
                alt={product.nameDE}
              />
            </a>
          </Link>
        )}
      </div>

      <div>
        {locale === 'en' && (
          <Link href={`/product/${product.slugEN}`}>
            <a className={classes['product-name']}>
              <h2>{product.nameEN}</h2>
            </a>
          </Link>
        )}
        {locale === 'it' && (
          <Link href={`/prodotto/${product.slugIT}`}>
            <a className={classes['product-name']}>
              <h2>{product.nameIT}</h2>
            </a>
          </Link>
        )}
        {locale === 'de' && (
          <Link href={`/produkt/${product.slugDE}`}>
            <a className={classes['product-name']}>
              <h2>{product.nameDE}</h2>
            </a>
          </Link>
        )}
        <div className={classes['line-wrapper']}>
          <p>€ {product.price}</p>
        </div>
        <div className={classes['line-wrapper']}>
          <div className={classes['btn-wrapper']}>
            <BtnCTA
              label={
                locale === 'en'
                  ? 'Add to Cart'
                  : locale === 'it'
                  ? 'Aggiungi al carrello'
                  : 'Opladen naar kart'
              }
              onCLickAction={addToCartHandler}
              icon={true}
              iconType="bi:cart"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
