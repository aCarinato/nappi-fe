import classes from './MainHeader.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { Store } from '../../context/Store';

import { useEffect, useRef, useState, useContext } from 'react';

function MainHeader() {
  const router = useRouter();
  const { locales, locale } = router;

  const [isVisible, setIsVisible] = useState(false);

  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const node = useRef();
  // console.log(node);

  // Track events outside scope
  const clickOutside = (e) => {
    // console.log(node.current);
    if (
      node.current &&
      node.current !== null &&
      node.current.contains(e.target)
    ) {
      // inside click
      // console.log('clicked inside');
      return;
    }
    // outside click
    // console.log('clicked outside scope');
    setIsVisible(false);
  };

  // Do something after component renders
  useEffect(() => {
    document.addEventListener('mousedown', clickOutside);

    // clean up function before running new effect
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, []);

  return (
    <header className={classes.container}>
      <div className={classes['container-item']}>
        <div
          className={classes['container-item-label']}
          onClick={() => router.push('/')}
        >
          {' '}
          Nappitello
        </div>
      </div>
      <div className={classes['container-item']}>
        {locale === 'it' && (
          <div className={classes['container-item-label']}>
            Carrello{' '}
            {cart.cartItems.length > 0 && (
              <span className={classes['cart-items']}>
                {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
              </span>
            )}
          </div>
        )}
        {locale === 'en' && (
          <div
            className={classes['container-item-label']}
            onClick={() => router.push('/cart')}
          >
            Cart{' '}
            {cart.cartItems.length > 0 && (
              <span className={classes['cart-items']}>
                {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
              </span>
            )}
          </div>
        )}
        {locale === 'de' && (
          <div className={classes['container-item-label']}>
            Kart{' '}
            {cart.cartItems.length > 0 && (
              <span className={classes['cart-items']}>
                {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
              </span>
            )}
          </div>
        )}
        <div className={classes['container-item-label']}>Login</div>
        <div className={classes['container-item-locales']}>
          <div
            className={classes['container-item-locale']}
            onClick={() => setIsVisible((current) => !current)}
          >
            {locale}
          </div>
          {isVisible && (
            <div ref={node} className={classes['container-flex-vertical']}>
              {locales.map((l, i) => {
                const { pathname, query, asPath } = router;
                if (l !== locale) {
                  return (
                    <span
                      onClick={() => setIsVisible((current) => !current)}
                      key={i}
                      className={classes.lang}
                    >
                      <Link href={{ pathname, query }} as={asPath} locale={l}>
                        <a>{l}</a>
                      </Link>
                    </span>
                  );
                }
              })}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default MainHeader;
