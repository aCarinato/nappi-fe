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
    <div>
      {locale === 'en' && (
        <Link href={`/product/${product.slugEN}`}>
          <a>
            <img src={product.image} alt={product.nameEN} />
          </a>
        </Link>
      )}
      {locale === 'it' && (
        <Link href={`/product/${product.slugIT}`}>
          <a>
            <img src={product.image} alt={product.nameIT} />
          </a>
        </Link>
      )}
      {locale === 'de' && (
        <Link href={`/product/${product.slugDE}`}>
          <a>
            <img src={product.image} alt={product.nameDE} />
          </a>
        </Link>
      )}
      <div>
        {locale === 'en' && (
          <Link href={`/product/${product.slugEN}`}>
            <a>
              <h2>{product.nameEN}</h2>
            </a>
          </Link>
        )}
        {locale === 'it' && (
          <Link href={`/product/${product.slugIT}`}>
            <a>
              <h2>{product.nameIT}</h2>
            </a>
          </Link>
        )}
        {locale === 'de' && (
          <Link href={`/product/${product.slugDE}`}>
            <a>
              <h2>{product.nameDE}</h2>
            </a>
          </Link>
        )}
        <p>€ {product.price}</p>
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
  );
}

export default ProductItem;
