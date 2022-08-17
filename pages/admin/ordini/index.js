import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
// context
import { useMainContext } from '../../../context/Context';
// own components
import AdminRoute from '../../../components/routes/AdminRoute';

function AdminOrdersPage() {
  const { adminState, authState } = useMainContext();

  // FECTHING ORDERS
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [orders, setOrders] = useState([]);
  const fetchOrders = async () => {
    try {
      setLoadingOrders(true);
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/admin/orders`,
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );
      // console.log(data);
      setOrders(data);
      setLoadingOrders(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (authState !== null && authState.token) fetchOrders();
    // console.log(`Bearer ${authState.token}`);
  }, [authState]);

  return (
    <AdminRoute>
      {
        loadingOrders ? (
          <div>Loading...</div>
        ) : (
          <div>
            <div>
              <Link href="/admin/dashboard" passHref>
                <a>Dashboard</a>
              </Link>
              <Link href="/admin/prodotti" passHref>
                <a>Prodotti</a>
              </Link>
              <Link href="/admin/clienti" passHref>
                <a>Clienti</a>
              </Link>
            </div>
            <br></br>
            <div>
              <h1>Panoramica Ordini</h1>
              {loadingOrders ? (
                <div>Caricamento ordini...</div>
              ) : (
                <div>
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>CLIENTE</th>
                        <th>DATA</th>
                        <th>TOTALE</th>
                        <th>PAGATO</th>
                        <th>CONSEGNATO</th>
                        <th>AZIONE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loadingOrders ? (
                        <div>Caricamento ordini...</div>
                      ) : (
                        orders.map((order) => (
                          <tr key={order._id}>
                            <td>{order._id.substring(20, 24)}</td>
                            <td>
                              {order.user
                                ? order.username
                                : 'utente cancellato'}
                            </td>
                            <td>{order.createdAt.substring(0, 10)}</td>
                            <td>EUR {order.totalPrice}</td>
                            <td>
                              {order.isPaid
                                ? order.paidAt.substring(0, 10)
                                : 'Non pagato'}
                            </td>
                            <td>
                              {order.isDelivered
                                ? order.deliveredAt.substring(0, 10)
                                : 'Non consegnato'}
                            </td>
                            <td>
                              <Link
                                href={`/admin/ordini/${order._id}`}
                                passHref
                              >
                                <a>Dettagli Ordine</a>
                              </Link>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )
        // : (
        //   <div>
        //     Inserisci{' '}
        //     <Link href="/amministratore">credenziali amministratore</Link>
        //   </div>
      }
    </AdminRoute>
  );
}

export default AdminOrdersPage;
