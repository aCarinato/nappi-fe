import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
// own components
import CheckoutWizard from '../../components/purchase/CheckoutWizard';
import UserRoute from '../../components/routes/UserRoute';
import PurchaseSummary from '../../components/purchase/PurchaseSummary';
// context
import { Store } from '../../context/Store';
import { useMainContext } from '../../context/Context';
// libraries
import { useRouter } from 'next/router';
import axios from 'axios';

function CompletaOrdinePage() {
  const { authState } = useMainContext();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems, shippingAddress, paymentMethod } = cart;

  // console.log('CART: ');
  // console.log(cart);

  // Switch language
  const router = useRouter();
  const { locale } = router;
  useEffect(() => {
    if (locale === 'en') router.push('/place-order');
    if (locale === 'de') router.push('/bestellung-aufgeben');
  }, [locale]);

  // function to round to 2 decimals
  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );

  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = round2(itemsPrice * 0.15);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  useEffect(() => {
    console.log(paymentMethod);
    if (paymentMethod === '') {
      // router.push('/payment');
      console.log('NIENTEEE');
    }
  }, [paymentMethod]);

  const [loading, setLoading] = useState();

  const placeOrderHandler = async () => {
    try {
      // console.log('DAIIII');
      setLoading(true);
      console.log(cartItems);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/order/place-order`,
        {
          orderItems: cartItems,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );

      setLoading(false);
      dispatch({ type: 'CART_CLEAR_ITEMS' });
      localStorage.setItem(
        'nappi-cart',
        JSON.stringify({
          ...cart,
          cartItems: [],
        })
      );
      if (paymentMethod === 'Paypal') {
        if (locale === 'en') router.push(`/orders/${data._id}`);
        if (locale === 'it') router.push(`/ordini/${data._id}`);
        if (locale === 'de') router.push(`/bestellen/${data._id}`);
      }

      if (paymentMethod === 'Stripe') {
        if (locale === 'en') router.push(`/orders-strp/${data._id}`);
        if (locale === 'it') router.push(`/ordini-strp/${data._id}`);
        if (locale === 'de') router.push(`/bestellen-strp/${data._id}`);
      }
    } catch (err) {
      setLoading(false);
      console.log('ERRORR');
    }
  };

  return (
    <UserRoute>
      <CheckoutWizard activeStep={3} />
      <h1>Completa ordine</h1>
      <br></br>
      {cartItems.length === 0 ? (
        <div>
          Il carrello è vuoto. <Link href="/">Vai agli articoli.</Link>
        </div>
      ) : (
        <div>
          <div>
            <h2>Indirizzo di spedizione</h2>
            <div>
              {shippingAddress.fullName}, {shippingAddress.address}{' '}
              {shippingAddress.city}, {shippingAddress.postalCode}{' '}
              {shippingAddress.country}
            </div>
            <div>
              <Link href="/shipping">Edit</Link>
            </div>
          </div>

          <br></br>
          <div>
            <h2>Metodo di pagamento</h2>
            <div>{paymentMethod}</div>
            <div>
              <Link href="/payment">Edit</Link>
            </div>
          </div>
          <br></br>
          <div>
            <h2>RIASSUNTO CARRELLO (TO ADD HERE)</h2>
          </div>
          <br></br>
          <PurchaseSummary
            itemsPrice={itemsPrice}
            taxPrice={taxPrice}
            shippingPrice={shippingPrice}
            totalPrice={totalPrice}
            placeOrderHandler={placeOrderHandler}
          />
        </div>
      )}
    </UserRoute>
  );
}

export default CompletaOrdinePage;
