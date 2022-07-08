import classes from './ProductDetails.module.css';
import BtnCTA from '../UI/BtnCTA';

import { useRouter } from 'next/router';

function ProductDetails(props) {
  const {
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

  return (
    <div className={classes['main-container-grid']}>
      <div className={classes['grid-item-image']}>
        <img className={classes.image} src={productNameSrc} alt={productName} />
      </div>
      <div>
        <ul className={classes['product-detail-list']}>
          <li>
            <h1 className={classes['product-name-h1']}>{productName}</h1>
          </li>
          <li>Catergory: {productCategory}</li>
          <li>
            {productRating} of {numReviews} reviews
          </li>
          <li>Description: {productDescription}</li>
        </ul>
      </div>
      <div>
        <div className={classes['action-card']}>
          <div className={classes['action-card-flex']}>
            <div className={classes['flex-item']}>Price</div>
            <div className={classes['flex-item']}>€ {productPrice}</div>
          </div>
          <div className={classes['action-card-flex']}>
            <div className={classes['flex-item']}>Status:</div>
            <div className={classes['flex-item']}>
              {productInStock > 0 ? 'In stock' : 'Unavailable'}
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
              onCLickAction={() => {}}
              icon={true}
              iconType="bi:cart"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
