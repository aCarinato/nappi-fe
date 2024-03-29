import React, { useEffect, useState } from 'react';
// next js
import { useRouter } from 'next/router';
import {
  CardElement,
  //   Elements,
  // IdealBankElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import axios from 'axios';
import { useMainContext } from '../../context/Context';

function StripeCheckout(props) {
  const { totalPrice, orderId } = props;

  const { authState } = useMainContext();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState('');

  const router = useRouter();
  const { locale } = router;

  //   const [totalPrice, setTotalPrice] = useState(0);

  //   useEffect(() => {
  //     fetchOrder();
  //   }, []);

  const createPaymentIntent = async () => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API}/stripe/create-payment-intent`,
      { totalPrice },
      {
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
      }
    );

    // console.log(res.data.clientSecret);
    return res.data.clientSecret;
  };

  const stripe = useStripe();
  const elements = useElements();

  const handleChange = async (e) => {
    // e.preventDefault();
    setDisabled(e.empty); // disable pay button if error
    setError(e.error ? e.error.message : ''); // show error message
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });

    if (payload.error) {
      setError(`Payment failed: ${payload.error.message}`);
      setProcessing(false);
    } else {
      // save order in the database
      // empty cart
      // console.log(JSON.stringify(payload, null, 4));
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API}/order/${orderId}/pay`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );
      setError(null);
      setProcessing(false);
      setSucceeded(true);

      if (locale === 'en') router.push(`/orders/${orderId}`);
      if (locale === 'it') router.push(`/ordini/${orderId}`);
      if (locale === 'de') router.push(`/bestellen/${orderId}`);
    }
  };

  useEffect(() => {
    // fetchOrder();
    createPaymentIntent()
      .then((res) => {
        // console.log('create payment intent');
        // console.log(res);
        const secret = res;
        return secret;
      })
      .then((secret) => {
        // console.log('de novo');
        // console.log(merda);
        setClientSecret(secret);
      });
    // const secret = createPaymentIntent();
    // console.log(secret);
  }, []);

  return (
    <div>
      StripeCheckout
      <form onSubmit={handleSubmit}>
        <CardElement onChange={handleChange} />
        {/* <IdealBankElement /> */}
        <button disabled={disabled}>Pay</button>
      </form>
      {processing && <div>Processing payment...</div>}
      {error && <div>{error}</div>}
      {succeeded && <div>Payment successful</div>}
    </div>
  );
}

export default StripeCheckout;
