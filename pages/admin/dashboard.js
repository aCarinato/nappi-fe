import axios from 'axios';
import Bar from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { Fragment, useEffect, useState } from 'react';
// context
import { useMainContext } from '../../context/Context';
//
import AdminRoute from '../../components/routes/AdminRoute';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

function AdminDashboard() {
  const { authState, adminState, logoutAdmin } = useMainContext();

  const router = useRouter();

  // FETCHING THE USER
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/auth/${authState.email}`
      );
      // console.log(data);
      setUser(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
    // router.push(`/profilo/${authState.username}`);
    // console.log(user);
  };

  useEffect(() => {
    let cancel = false;

    if (authState !== null && authState.token) {
      fetchUser();
    }

    // if (!user.isAdmin) {
    //   router.push('/login');
    // }
    return () => {
      cancel = true;
    };
  }, [authState]);

  //   FETCH THE SUMMARY
  const [summary, setSummay] = useState({});
  const [loadingSummary, setLoadingSummary] = useState(false);
  const fetchSummary = async () => {
    try {
      setLoadingSummary(true);
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/admin/summary`,
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );
      //   console.log(data);
      setSummay(data);
      setLoadingSummary(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (authState !== null && authState.token && authState.isAdmin)
      fetchSummary();
    // }, [authState.token && authState.isAdmin]);
  }, [authState]);

  //  CHART
  const [chartData, setChartData] = useState({});
  useEffect(() => {
    if (summary.salesData) {
      //   console.log(summary.salesData);
      const data = {
        labels: summary.salesData.map((x) => x._id),
        datasets: [
          {
            label: 'Sales',
            backgroundColor: 'rgba(162, 222, 208, 1)',
            data: summary.salesData.map((x) => x.totalSales),
          },
        ],
      };
      //   console.log(chartData);
      setChartData(data);
    }
  }, [summary]);

  const logoutHandler = () => {
    logoutAdmin();
  };

  return (
    <AdminRoute>
      {
        loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div>AdminDashboard</div>
            <div>
              <Link href="/admin/ordini" passHref>
                <a>Ordini</a>
              </Link>
              <br></br>
              <Link href="/admin/prodotti" passHref>
                <a>Prodotti</a>
              </Link>
              <br></br>
              <Link href="/admin/clienti" passHref>
                <a>Clienti</a>
              </Link>
              <br></br>
            </div>
            <br></br>
            {loadingSummary ? (
              <div>Caricando riassunto...</div>
            ) : (
              <div>
                <div>
                  <p>EUR {summary.ordersPrice}</p>
                  <p>Vendite</p>
                  <Link href="admin/orders">Visualizza vendite</Link>
                </div>
                <div>
                  <p>N. {summary.ordersCount}</p>
                  <p>Ordini</p>
                  <Link href="admin/orders">Vedi ordini</Link>
                </div>
                <div>
                  <p>{summary.productsCount}</p>
                  <p>Prodotti</p>
                  <Link href="admin/products">Vedi prodotti</Link>
                </div>
                <div>
                  <p>{summary.usersCount}</p>
                  <p>Clienti</p>
                  <Link href="admin/users">Vedi clienti</Link>
                </div>
              </div>
            )}
            {/* <br></br>
          <button onClick={logoutHandler}>Logout</button> */}
          </>
        )
        // : (
        //   <div>
        //     Inserisci{' '}
        //     <Link href="/amministratore">credenziali amministratore</Link>
        //   </div>
        // )
      }
    </AdminRoute>
  );
}

export default AdminDashboard;
