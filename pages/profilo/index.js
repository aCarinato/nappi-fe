import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
// own components
import UserRoute from '../../components/routes/UserRoute';
import SpinningLoader from '../../components/UI/SpinningLoader';
// context
import { useMainContext } from '../../context/Context';

function ProfiloPage() {
  const { authState } = useMainContext();
  const router = useRouter();
  const { locale } = router;

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  console.log(authState);
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

    if (authState !== null && authState.email && !cancel) {
      fetchUser();
    } else {
      router.push('/login');
    }

    return () => {
      cancel = true;
    };
  }, [authState]);

  useEffect(() => {
    if (locale === 'en') {
      router.push(`/profile`);
    }

    if (locale === 'de') {
      router.push(`/profil`);
    }
  }, [locale]);

  return (
    <Fragment>
      {loading ? (
        <SpinningLoader />
      ) : (
        <UserRoute>
          <div>Pagina personale {user.username}</div>
          <br></br>
          <Link href={`/profilo/storia-ordini`} passHref>
            <a>I miei ordini</a>
          </Link>
          <br></br>
          <Link href={`/profilo/modifica-profilo`} passHref>
            <a>Modifica profilo</a>
          </Link>
        </UserRoute>
      )}
    </Fragment>
  );
}

export default ProfiloPage;
