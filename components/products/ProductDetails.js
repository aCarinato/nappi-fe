import classes from './ProductDetails.module.css';
import BtnCTA from '../UI/BtnCTA';

import { useRouter } from 'next/router';

import { Store } from '../../context/Store';
import { useContext } from 'react';

function ProductDetails(props) {
  const {
    product,
    productName,
    productNameSrc,
    productCategory,
    productRating,
    numReviews,
    productDescription,
    productPrice,
    productInStock,
  } = props;

  const router = useRouter();
  const { locale } = router;

  const { state, dispatch } = useContext(Store);
  // const { cart } = state;

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
    <div className={classes['main-container-grid']}>
      <div className={classes['grid-item-image']}>
        <img className={classes.image} src={productNameSrc} alt={productName} />
      </div>
      <div>
        <ul className={classes['product-detail-list']}>
          <li>
            <h1>{productName}</h1>
          </li>
          <li>Catergory: {productCategory}</li>
          {locale === 'en' && (
            <li>
              {productRating} of {numReviews} reviews
            </li>
          )}
          {locale === 'it' && (
            <li>
              {productRating} di {numReviews} recenesioni
            </li>
          )}
          {locale === 'de' && (
            <li>
              {productRating} von {numReviews} recentie
            </li>
          )}
          <li>Description: {productDescription}</li>
        </ul>
      </div>
      <div>
        <div className={classes['action-card']}>
          <div className={classes['action-card-flex']}>
            <div className={classes['flex-item']}>
              {locale === 'en' ? 'Price' : locale === 'it' ? 'Prezzo' : 'Preis'}
            </div>
            <div className={classes['flex-item']}>€ {productPrice}</div>
          </div>
          <div className={classes['action-card-flex']}>
            <div className={classes['flex-item']}>Status:</div>
            <div className={classes['flex-item']}>
              {locale === 'en' && productInStock > 0
                ? 'In stock'
                : locale === 'en' && productInStock === 0
                ? 'Unavailable'
                : locale === 'it' && productInStock > 0
                ? 'Disponibile'
                : locale === 'it' && productInStock === 0
                ? 'Non disponibile'
                : locale === 'de' && productInStock > 0
                ? 'Auf lager'
                : 'Nicht verfügbar'}
            </div>
          </div>
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
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
