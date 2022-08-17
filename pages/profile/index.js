import axios from 'axios';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
// own components
import UserRoute from '../../components/routes/UserRoute';
import SpinningLoader from '../../components/UI/SpinningLoader';
// context
import { useMainContext } from '../../context/Context';

function ProfilePage() {
  const { authState, login } = useMainContext();
  const router = useRouter();
  const { locale } = router;

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
    if (locale === 'it') {
      router.push(`/profilo`);
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
          <div>Profile Page. {user.username}</div>
          <br></br>
          <Link href={`/profile/order-history`} passHref>
            <a>Order History</a>
          </Link>
          <br></br>
          <Link href={`/profile/edit-profile`} passHref>
            <a>Edit profile</a>
          </Link>
        </UserRoute>
      )}
    </Fragment>
  );
}

export default ProfilePage;
