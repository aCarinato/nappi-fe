import classes from './Layout.module.css';

import MainHeader from './MainHeader';
import Footer from './Footer';

function Layout({ children }) {
  return (
    <div className={classes.container}>
      <MainHeader />
      <main className={classes.main}>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
