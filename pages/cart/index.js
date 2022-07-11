import { Fragment, useContext } from 'react';
import { Store } from '../../context/Store';

import CartList from '../../components/purchase/CartList';

import Link from 'next/link';

function CartPage() {
  const { state, dispatch } = useContext(Store);

  const {
    cart: { cartItems },
  } = state;

  return (
    <Fragment>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div>
          Cart is empty. Go to <Link href="/">home page</Link>
        </div>
      ) : (
        <CartList items={cartItems} />
      )}
    </Fragment>
  );
}

export default CartPage;
