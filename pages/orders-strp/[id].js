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

function OrderPage() {
  //
  const { authState } = useMainContext();
  const { query } = useRouter();
  const orderId = query.id;

  // load stripe outside component render
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
  console.log(stripePromise);

  //   MULTI LANGUAGE
  const router = useRouter();
  const { locale } = router;
  useEffect(() => {
    if (locale === 'it') router.push(`/ordini/${orderId}`);
    if (locale === 'de') router.push(`/bestellen/${orderId}`);
  }, [locale]);

  return (
    <UserRoute>
      <h1>Stripe payment</h1>
      <Elements stripe={stripePromise}>
        <div>COMPLETE YOUR PURCHASE</div>
        <StripeCheckout />
      </Elements>
    </UserRoute>
  );
}

export default OrderPage;
