import classes from './CartList.module.css';
import { useRouter } from 'next/router';
import { Fragment, useContext } from 'react';
// External components
import { Icon } from '@iconify/react';
// Custom components
import BtnCTA from '../UI/BtnCTA';
// State
import { Store } from '../../context/Store';

function CartList(props) {
  const router = useRouter();
  const { locale } = router;

  const { items } = props;

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

  return (
    <div className={classes['main-container-flex']}>
      <div className={classes['main-container-flex-item70']}>
        <div className={classes['flex-row']}>
          <div className={classes['flex-row-item']}>Item</div>
          <div className={classes['flex-row-item']}>Quantity</div>
          <div className={classes['flex-row-item']}>Price</div>
          <div className={classes['flex-row-item']}>Action</div>
        </div>
        {items.map((item) => (
          <div key={item._id} className={classes['flex-row']}>
            <div className={classes['flex-row-item']}>{item.nameEN}</div>
            <div className={classes['flex-row-item']}>
              {/* {item.quantity} */}
              <select
                value={item.quantity}
                onChange={(e) => updateCartHandler(item, e.target.value)}
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
                onClick={() => removeItemHandler(item)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className={classes['main-container-flex-item30']}>
        <div>
          Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}) : $
          {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
        </div>
        <div>
          <BtnCTA
            label="Check Out"
            onCLickAction={() => router.push('/shipping')}
            icon={true}
            iconType="bi:cart"
          />
        </div>
      </div>
    </div>
  );
}

export default CartList;
