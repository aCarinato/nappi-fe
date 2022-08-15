import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
// next
import { useRouter } from 'next/router';
import Link from 'next/link';
// own components
import UserRoute from '../../components/routes/UserRoute';
import { useMainContext } from '../../context/Context';
import OrderSummary from '../../components/purchase/OrderSummary';

function OrdiniPage() {
  const { authState, adminState } = useMainContext();
  const { query } = useRouter();
  const orderId = query.id;

  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState({});
  const [orderIsDelivered, setOrderIsDelivered] = useState(null);

  // Payment
  const [successPay, setSuccessPay] = useState(false);
  const [loadingPay, setLoadingPay] = useState(false);

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
      // setLoadingDeliver(true);
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API}/admin/orders/${orderId}/deliver`,
        {}
      );
      console.log(data);
      // setLoadingDeliver(false);
      setOrderIsDelivered(true);
    } catch (err) {
      console.log(err);
    }
  };

  //   MULTI LANGUAGE
  const router = useRouter();
  const { locale } = router;
  useEffect(() => {
    if (locale === 'en') router.push(`/orders/${orderId}`);
    if (locale === 'de') router.push(`/bestellen/${orderId}`);
  }, [locale]);

  return (
    // <UserRoute>
    <Fragment>
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
          ) : adminState !== null && adminState.isAdmin ? (
            <div>
              <button onClick={deliverOrderHandler}>
                {locale === 'en'
                  ? 'Notify delivery'
                  : locale === 'it'
                  ? 'Notifica spedizione'
                  : 'Betaalt op'}
              </button>
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
    </Fragment>
    // </UserRoute>
  );
}

export default OrdiniPage;
