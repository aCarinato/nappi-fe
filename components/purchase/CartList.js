import classes from './CartList.module.css';
import { useRouter } from 'next/router';
// import { Fragment, useContext } from 'react';
// External components
import { Icon } from '@iconify/react';
// Custom components
import BtnCTA from '../UI/BtnCTA';
// context
import { useMainContext } from '../../context/Context';

// import dynamic from 'next/dynamic';

function CartList(props) {
  const router = useRouter();
  const { locale } = router;

  const { items, removeItem, updateItem } = props;

  const { authState } = useMainContext();

  const checkoutHandler = () => {
    if (authState !== null && authState.token !== '') {
      if (locale === 'en') router.push('/shipping');
      if (locale === 'it') router.push('/spedizione');
      if (locale === 'de') router.push('/versand');
    } else {
      router.push('/login');
    }
  };

  return (
    <div className={classes['main-container-flex']}>
      <div className={classes['main-container-flex-item70']}>
        <div className={classes['flex-row']}>
          <div className={classes['flex-row-item']}>
            {locale === 'en'
              ? 'Item'
              : locale === 'it'
              ? 'Articolo'
              : 'Artikel'}
          </div>
          <div className={classes['flex-row-item']}>
            {locale === 'en'
              ? 'Quanity'
              : locale === 'it'
              ? 'Quantità'
              : 'Anzahl'}
          </div>
          <div className={classes['flex-row-item']}>
            {locale === 'en'
              ? 'Price €'
              : locale === 'it'
              ? 'Prezzo €'
              : 'Preis €'}
          </div>
          <div className={classes['flex-row-item']}>
            {' '}
            {locale === 'en' ? 'Action' : locale === 'it' ? 'Azione' : 'Aktion'}
          </div>
        </div>
        {items.map((item) => (
          <div key={item._id} className={classes['flex-row']}>
            <div className={classes['flex-row-item']}>{item.nameEN}</div>
            <div className={classes['flex-row-item']}>
              <select
                value={item.quantity}
                onChange={(e) => updateItem(item, e.target.value)}
              >
                {[...Array(item.countInStock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className={classes['flex-row-item']}>{item.price}</div>
            <div className={classes['flex-row-item']}>
              <Icon
                className={classes.icon}
                icon="gridicons:cross-circle"
                onClick={() => removeItem(item)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className={classes['main-container-flex-item30']}>
        <div>
          {locale === 'en' ? 'Total' : locale === 'it' ? 'Totale' : 'Gesamt'} (
          {items.reduce((a, c) => a + c.quantity, 0)}) : €
          {items.reduce((a, c) => a + c.quantity * c.price, 0)}
        </div>
        <div>
          <BtnCTA
            label="Check Out"
            onCLickAction={checkoutHandler}
            icon={true}
            iconType="bi:cart"
          />
        </div>
      </div>
    </div>
  );
}

// export default dynamic(() => Promise.resolve(CartList, { ssr: false }));
export default CartList;
