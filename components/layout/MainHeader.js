import classes from './MainHeader.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';

function MainHeader() {
  const router = useRouter();
  const { locales, locale } = router;

  return (
    <header className={classes.container}>
      <div className={classes['container-item']}>
        <div className={classes['container-item-label']}>Nappitello</div>
      </div>
      <div className={classes['container-item']}>
        {locale === 'it' && (
          <div className={classes['container-item-label']}>Carrello</div>
        )}
        {locale === 'en' && (
          <div className={classes['container-item-label']}>Cart</div>
        )}
        {locale === 'de' && (
          <div className={classes['container-item-label']}>Kart</div>
        )}
        <div className={classes['container-item-label']}>Login</div>
        <div className={classes['container-item-label']}>
          {locales.map((l, i) => {
            const { pathname, query, asPath } = router;
            return (
              <span key={i} className={classes.lang}>
                <Link href={{ pathname, query }} as={asPath} locale={l}>
                  <a>{l}</a>
                </Link>
              </span>
            );
          })}
        </div>
      </div>
    </header>
  );
}

export default MainHeader;
