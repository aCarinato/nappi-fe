import axios from 'axios';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
// own components
import UserRoute from '../../components/routes/UserRoute';
import { useMainContext } from '../../context/Context';
// import OrderSummary from '../../components/purchase/OrderSummary';
import StripeCheckout from '../../components/stripe/StripeCheckout';
import { loadStripe } from '@stripe/stripe-js';
import {
  //   CardElement,
  Elements,
  //   useStripe,
  //   useElements,
} from '@stripe/react-stripe-js';

// load stripe outside component render
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

function OrdersStrpPage() {
  //
  const { authState } = useMainContext();
  const { query } = useRouter();
  const orderId = query.id;
  const [order, setOrder] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(null);

  const fetchOrder = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/order/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );

      //   console.log(data);
      setTotalPrice(data.totalPrice);

      setOrder(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  //   MULTI LANGUAGE
  const router = useRouter();
  const { locale } = router;
  useEffect(() => {
    if (locale === 'it') router.push(`/ordini-strp/${orderId}`);
    if (locale === 'de') router.push(`/bestellen-strp/${orderId}`);
  }, [locale]);

  const options = {
    locale: locale,
  };

  return (
    <UserRoute>
      {order && order.isPaid ? (
        <div>Order is paid</div>
      ) : (
        <Fragment>
          <h1>Stripe payment</h1>
          <Elements stripe={stripePromise} options={options}>
            <div>COMPLETE YOUR PURCHASE</div>
            {!loading && (
              <StripeCheckout orderId={orderId} totalPrice={totalPrice} />
            )}
          </Elements>
        </Fragment>
      )}
    </UserRoute>
  );
}

export default OrdersStrpPage;
