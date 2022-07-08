import classes from './ProductItem.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

import BtnCTA from '../UI/BtnCTA';

function ProductItem(props) {
  const { product } = props;

  const router = useRouter();
  const { locale } = router;

  const addToCartHandler = () => {
    // console.log('')
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
          <Link href={`/product/${product.slugIT}`}>
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
          <Link href={`/product/${product.slugDE}`}>
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
          <Link href={`/product/${product.slugIT}`}>
            <a className={classes['product-name']}>
              <h2>{product.nameIT}</h2>
            </a>
          </Link>
        )}
        {locale === 'de' && (
          <Link href={`/product/${product.slugDE}`}>
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
