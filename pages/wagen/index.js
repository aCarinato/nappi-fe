import { Fragment, useContext, useEffect } from 'react';
import { Store } from '../../context/Store';

import CartList from '../../components/purchase/CartList';

import Link from 'next/link';
import { useRouter } from 'next/router';

function CartPage() {
  const { state, dispatch } = useContext(Store);

  const {
    cart: { cartItems },
  } = state;

  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const updateCartHandler = async (item, qty) => {
    const quantity = Number(qty);
    // const { data } = await axios.get(`/api/products/${item._id}`);
    // if (data.countInStock < quantity) {
    //   return toast.error('Sorry. Product is out of stock');
    // }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
    // toast.success('Product updated in the cart');
  };

  const router = useRouter();
  const { locale } = router;

  useEffect(() => {
    if (locale === 'it') {
      router.push('/carrello');
    }
    if (locale === 'en') {
      router.push('/cart');
    }
  }, [locale]);

  return (
    <Fragment>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div>
          Cart is empty. Go to <Link href="/">home page</Link>
        </div>
      ) : (
        <CartList
          items={cartItems}
          removeItem={removeItemHandler}
          updateItem={updateCartHandler}
        />
      )}
    </Fragment>
  );
}

export default CartPage;
// export default dynamic(() => Promise.resolve(CartPage, { ssr: false }));
