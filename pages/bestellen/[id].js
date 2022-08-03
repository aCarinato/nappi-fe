import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// own components
import UserRoute from '../../components/routes/UserRoute';
import { useMainContext } from '../../context/Context';
import OrderSummary from '../../components/purchase/OrderSummary';
import { usePayPalScriptReducer } from '@paypal/react-paypal-js';

function BestellenPage() {
  const { authState } = useMainContext();
  const { query } = useRouter();
  const orderId = query.id;

  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState({});

  // Payment
  const [successPay, setSuccessPay] = useState(false);
  const [loadingPay, setLoadingPay] = useState(false);

  //   PAYPAL
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  // Set up the parameters of the transaction.
  // It is called when the buyer clicks the button.
  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  // This is called after the buyer approves the transaction
  // Captures the funds from the transaction and shows a message to the buyer to let buyer know the transaction is successful
  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        setLoadingPay(true);
        // Upodate the state of the order in the backend with the 'details' provided by paypal
        const { data } = await axios.put(
          `${process.env.NEXT_PUBLIC_API}/order/${order._id}/pay`,
          details,
          {
            headers: {
              Authorization: `Bearer ${authState.token}`,
            },
          }
        );
        setSuccessPay(true);
        setLoadingPay(false);
        window.alert('Order is paid successfully');
      } catch (err) {
        // dispatch({ type: 'PAY_FAIL', payload: getError(err) });
        // toast.error(getError(err));
      }
    });
  }
  // sb-nwiaz19659132@personal.example.com
  // 4Eoph-q1

  function onError(err) {
    // toast.error(getError(err));
    // console.log(err);
    alert('An error occurred');
  }

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        // console.log(orderId);
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/order/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${authState.token}`,
            },
          }
        );

        setOrder(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    if (orderId !== undefined || successPay) {
      fetchOrder();
      if (successPay) {
        setLoadingPay(false);
        setSuccessPay(false);
      }
    } else {
      // Load the script and reset options
      const loadPaypalScript = async () => {
        // const { data: clientId } = await axios.get(
        //   `${process.env.NEXT_PUBLIC_API}/keys/paypal`
        // );
        const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': clientId,
            currency: 'EUR',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      loadPaypalScript();
    }
  }, [orderId, successPay]);

  // MULTI LANGUAGE
  const router = useRouter();
  const { locale } = router;
  useEffect(() => {
    if (locale === 'en') router.push(`/orders/${orderId}`);
    if (locale === 'it') router.push(`/ordini/${orderId}`);
  }, [locale]);

  //   const [{ loading, error, order }, dispatch] = useReducer(reducer, {
  //     loading: true,
  //     order: {},
  //     error: '',
  //   });

  return (
    <UserRoute>
      <h1>Bestellen: {orderId}</h1>
      <br></br>
      {loading ? (
        <div>Loading...</div>
      ) : (
        order && (
          <OrderSummary
            shippingAddress={order.shippingAddress}
            isDelivered={order.isDelivered}
            deliveredAt={order.deliveredAt}
            paymentMethod={order.paymentMethod}
            isPaid={order.isPaid}
            paidAt={order.paidAt}
            orderItems={order.orderItems}
            itemsPrice={order.itemsPrice}
            taxPrice={order.taxPrice}
            shippingPrice={order.shippingPrice}
            totalPrice={order.totalPrice}
            isPending={isPending}
            // successPay={successPay}
            loadingPay={loadingPay}
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onError}
          />
        )
      )}
    </UserRoute>
  );
}

export default BestellenPage;
