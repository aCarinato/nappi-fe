import classes from './MainHeader.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';
// context
import { useMainContext } from '../../context/Context';
import { Store } from '../../context/Store';
// hooks
import { useEffect, useRef, useState, useContext } from 'react';
// own components
import DropdownMenu from './DropdownMenu';

function MainHeader() {
  const router = useRouter();
  const { locales, locale } = router;

  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const { authState, logout } = useMainContext();

  const node = useRef();
  const nodeUser = useRef();
  // console.log(node);

  // Track events outside scope
  const clickOutside = (e) => {
    // console.log(node.current);
    if (
      (node.current &&
        node.current !== null &&
        node.current.contains(e.target)) ||
      (nodeUser.current &&
        nodeUser.current !== null &&
        nodeUser.current.contains(e.target))
    ) {
      // inside click
      // console.log('clicked inside');
      return;
    }

    // outside click
    // console.log('clicked outside scope');
    setLangMenuOpen(false);
    setProfileMenuOpen(false);
  };

  const goToProfileHandler = () => {
    if (locale === 'en') router.push('/profile');
    if (locale === 'it') router.push('/profilo');
    if (locale === 'de') router.push('/profil');
    setProfileMenuOpen(false);
  };

  const goToHistoryHandler = () => {
    console.log('order history');
    setProfileMenuOpen(false);
  };

  const logoutHandler = () => {
    // console.log('logout');
    logout();
    router.push('/login');
    setProfileMenuOpen(false);
  };

  const profileMenuItems = [
    {
      name:
        locale === 'en' ? 'Profile' : locale === 'it' ? 'Profilo' : 'Profil',
      action: goToProfileHandler,
    },
    { name: 'Order History', action: goToHistoryHandler },
    { name: 'Logout', action: logoutHandler },
  ];

  // Do something after component renders
  useEffect(() => {
    document.addEventListener('mousedown', clickOutside);

    // clean up function before running new effect
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, []);

  useEffect(() => {
    if (authState !== null && authState.username !== '') {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [authState]);

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
          <div
            className={classes['container-item-label']}
            onClick={() => router.push('/carrello')}
          >
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
          <div
            className={classes['container-item-label']}
            onClick={() => router.push('/wagen')}
          >
            Wagen{' '}
            {cart.cartItems.length > 0 && (
              <span className={classes['cart-items']}>
                {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
              </span>
            )}
          </div>
        )}
        {isLoggedIn ? (
          <div className={classes['container-item-user']}>
            <div
              className={classes['container-item-label']}
              onClick={() => {
                setProfileMenuOpen((current) => !current);
                setLangMenuOpen(false);
              }}
            >
              {authState.username}
            </div>
            {profileMenuOpen && (
              <DropdownMenu ref={nodeUser} menuItems={profileMenuItems} />
            )}
          </div>
        ) : (
          <div
            className={classes['container-item-label']}
            onClick={() => router.push('/login')}
          >
            Login
          </div>
        )}
        {/* <div className={classes['container-item-label']}></div> */}

        <div className={classes['container-item-locales']}>
          <div
            className={classes['container-item-locale']}
            onClick={() => {
              setLangMenuOpen((current) => !current);
              setProfileMenuOpen(false);
            }}
          >
            {locale}
          </div>
          {langMenuOpen && (
            <div ref={node} className={classes['container-flex-vertical']}>
              {locales.map((l, i) => {
                const { pathname, query, asPath } = router;
                if (l !== locale) {
                  return (
                    <span
                      onClick={() => setLangMenuOpen((current) => !current)}
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
