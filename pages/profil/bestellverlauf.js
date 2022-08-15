import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
// own components
import UserRoute from '../../components/routes/UserRoute';
import { useMainContext } from '../../context/Context';

function BestellverlaufPage() {
  const { authState } = useMainContext();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(null);

  //   console.log(authState.token);
  const fetchOrders = async () => {
    try {
      //   console.log(`Bearer ${authState.token}`);
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/order/order-history`,
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );

      //   console.log(res);

      setOrders(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (authState && authState.token) {
      fetchOrders();
    }
  }, [authState.token]);

  //   MULTI LANGUAGE
  const router = useRouter();
  const { locale } = router;
  useEffect(() => {
    if (locale === 'it') router.push(`/profilo/storia-ordini`);
    if (locale === 'en') router.push(`/profile/order-history`);
  }, [locale]);

  return (
    <UserRoute>
      <h1>Bestellverlauf</h1>
      {loading ? (
        <div>LADEAUFTRÄGE...</div>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATUM</th>
                <th>GESAMT</th>
                <th>BEZAHLT</th>
                <th>GELIEFERT</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id.substring(20, 24)}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid
                      ? `${order.paidAt.substring(0, 10)}`
                      : `nicht bezahlt`}
                  </td>
                  <td>
                    {order.isDelivered
                      ? `${order.deliveredAt.substring(0, 10)}`
                      : `niet geliefert`}
                  </td>
                  <td>
                    <Link href={`/bestellen/${order._id}`} passHref>
                      <a>Details</a>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </UserRoute>
  );
}

export default BestellverlaufPage;
