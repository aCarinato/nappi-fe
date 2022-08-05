import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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

function OrdiniStrpPage() {
  //
  const { authState } = useMainContext();
  const { query } = useRouter();
  const orderId = query.id;

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

      //   console.log(data.totalPrice);
      setTotalPrice(data.totalPrice);

      //   setOrder(data);
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
    if (locale === 'en') router.push(`/orders-strp/${orderId}`);
    if (locale === 'de') router.push(`/bestellen-strp/${orderId}`);
  }, [locale]);

  const options = {
    locale: locale,
  };

  return (
    <UserRoute>
      <h1>Pagamento con stripe</h1>
      <Elements stripe={stripePromise} options={options}>
        <div>COMPLETA IL TUO ACQUISTO</div>
        {!loading && <StripeCheckout totalPrice={totalPrice} />}
      </Elements>
    </UserRoute>
  );
}

export default OrdiniStrpPage;
