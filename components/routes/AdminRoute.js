import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import SpinningLoader from '../UI/SpinningLoader';
import { useMainContext } from '../../context/Context';

function AdminRoute({ children }) {
  const [ok, setOk] = useState(false);
  const router = useRouter();
  // const { locale } = router;
  const { authState } = useMainContext();

  useEffect(() => {
    // let cancel = false;
    if (authState && authState.token && authState.isAdmin) {
      getCurrentUser();
    } else {
      router.push('/login');
    }

    // return () => {
    //   cancel = true;
    // };
  }, [authState && authState.token && authState.isAdmin]);

  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/auth/current-admin`,
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );
      if (data.ok) {
        setOk(true);
      } else {
        router.push('/login');
      }
    } catch (err) {
      console.log(err);
    }
  };

  process.browser &&
    authState === null &&
    setTimeout(() => {
      getCurrentUser();
    }, 1000);

  return !ok ? <SpinningLoader /> : <>{children}</>;
}

export default AdminRoute;
