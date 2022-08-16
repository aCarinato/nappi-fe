import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState, Fragment } from 'react';
// own components
import UserRoute from '../../components/routes/UserRoute';
import { useMainContext } from '../../context/Context';
import OrderSummary from '../../components/purchase/OrderSummary';
import { usePayPalScriptReducer } from '@paypal/react-paypal-js';

function BestellenPage() {
  const { authState, adminState } = useMainContext();
  const { query } = useRouter();
  const orderId = query.id;

  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState({});

  // Payment
  const [successPay, setSuccessPay] = useState(false);
  const [loadingPay, setLoadingPay] = useState(false);

  //   PAYPAL
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  // Delivery
  const [orderIsDelivered, setOrderIsDelivered] = useState(null);

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
        // console.log(data);

        setOrder(data);
        setLoading(false);

        if (order.isDelivered) {
          setOrderIsDelivered(true);
        } else {
          setOrderIsDelivered(false);
        }
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
    }
  }, [orderId, orderIsDelivered, successPay]);

  // ORDER DELIVERY
  // const [loadingDeliver, setLoadingDeliver] = useState(false);
  const deliverOrderHandler = async () => {
    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API}/admin/orders/${orderId}/deliver`,
        {}
      );

      setOrderIsDelivered(true);
    } catch (err) {
      console.log(err);
    }
  };

  // MULTI LANGUAGE
  const router = useRouter();
  const { locale } = router;
  useEffect(() => {
    if (locale === 'en') router.push(`/orders/${orderId}`);
    if (locale === 'it') router.push(`/ordini/${orderId}`);
  }, [locale]);

  return (
    <UserRoute>
      {order ? (
        <Fragment>
          <OrderSummary
            id={orderId}
            shippingAddress={order.shippingAddress}
            orderItems={order.orderItems}
            itemsPrice={order.itemsPrice}
            taxPrice={order.taxPrice}
            shippingPrice={order.shippingPrice}
            totalPrice={order.totalPrice}
            isPaid={order.isPaid}
            paidAt={order.paidAt}
          />
          <br></br>
          <h2>
            {' '}
            {locale === 'en'
              ? 'Delivery'
              : locale === 'it'
              ? 'Spedizione'
              : 'Bestuur'}
          </h2>
          {order.isDelivered ? (
            <div>
              {' '}
              {locale === 'en'
                ? `Delivered at ${order.deliveredAt}`
                : locale === 'it'
                ? `Spedito il ${order.deliveredAt}`
                : `Betaalt op ${order.deliveredAt}`}
            </div>
          ) : (
            <div>
              {' '}
              {locale === 'en'
                ? 'Not yet delivered'
                : locale === 'it'
                ? 'Spedizione pendente'
                : 'Versturen pendente'}
            </div>
          )}
        </Fragment>
      ) : (
        <div>un cazzo</div>
      )}
    </UserRoute>
  );
}

export default BestellenPage;
