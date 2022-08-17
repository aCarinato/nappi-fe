import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import SpinningLoader from '../UI/SpinningLoader';
import { useMainContext } from '../../context/Context';

const UserRoute = ({ children }) => {
  const [ok, setOk] = useState(false);
  const router = useRouter();
  // const { locale } = router;
  const { authState } = useMainContext();

  useEffect(() => {
    // let cancel = false;
    if (authState && authState.token) getCurrentUser();

    // return () => {
    //   cancel = true;
    // };
  }, [authState && authState.token]);

  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/auth/current-user`,
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );
      if (data.ok) setOk(true);
    } catch (err) {
      router.push('/login');
    }
  };

  process.browser &&
    authState === null &&
    setTimeout(() => {
      getCurrentUser();
    }, 1000);

  return !ok ? <SpinningLoader /> : <>{children}</>;
};

export default UserRoute;
