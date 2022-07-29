import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useReducer, useState } from 'react';
// own components
import UserRoute from '../../components/routes/UserRoute';
import { useMainContext } from '../../context/Context';
import OrderSummary from '../../components/purchase/OrderSummary';

// function reducer(state, action) {
//   switch (action.type) {
//     case 'FETCH_REQUEST': {
//       return { ...state, loading: true, error: '' };
//     }
//     case 'FETCH_SUCCESS': {
//       return { ...state, loading: false, order: action.payload, error: '' };
//     }
//     case 'FETCH_FAIL': {
//       return { ...state, loading: false, error: action.payload };
//     }
//     default:
//       state;
//   }
// }

function OrderPage() {
  const { authState } = useMainContext();
  const { query } = useRouter();
  const orderId = query.id;

  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);

  //   const [{ loading, error, order }, dispatch] = useReducer(reducer, {
  //     loading: true,
  //     order: {},
  //     error: '',
  //   });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        console.log(orderId);
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
    if (orderId !== undefined) fetchOrder();
  }, [orderId]);

  //   MULTI LANGUAGE
  //   const router = useRouter();
  //   const { locale } = router;
  //   useEffect(() => {
  //     if (locale === 'it') router.push('/completa-ordine');
  //     if (locale === 'de') router.push('/bestellung-aufgeben');
  //   }, [locale]);

  return (
    <UserRoute>
      <h1>Order: {orderId}</h1>
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
          />
        )
      )}
    </UserRoute>
  );
}

export default OrderPage;
