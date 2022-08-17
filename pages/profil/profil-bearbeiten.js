import axios from 'axios';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
// own components
import UserRoute from '../../components/routes/UserRoute';
import SpinningLoader from '../../components/UI/SpinningLoader';
import MyForm from '../../components/form/MyForm';
// context
import { useMainContext } from '../../context/Context';

function ProfilBearbeitenPage() {
  const { authState, login } = useMainContext();
  const router = useRouter();
  const { locale } = router;

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const usernameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const formFields = [
    {
      label:
        locale === 'en'
          ? 'Username'
          : locale === 'it'
          ? 'Nome utente'
          : 'Nutzername',
      id: 'username',
      inputType: 'text',
      ref: usernameInputRef,
      defaultValue: user.username,
    },
    {
      label: 'email',
      id: 'email',
      inputType: 'email',
      ref: emailInputRef,
      defaultValue: user.email,
    },
    {
      label: 'password',
      id: 'password',
      inputType: 'password',
      ref: passwordInputRef,
    },
    {
      label: 'confirm password',
      id: 'confirm-password',
      inputType: 'password',
      ref: confirmPasswordInputRef,
    },
  ];

  const labelCTA =
    locale === 'en'
      ? 'Update profile'
      : locale === 'it'
      ? 'Aggiorna profilo'
      : 'Anmeldung';

  const formSubmit = async (e) => {
    e.preventDefault();
    const enteredUsername = usernameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const confirmEnteredPassword = confirmPasswordInputRef.current.value;

    if (enteredPassword.length < 6) {
      setError('Password > 5');
      return;
    }

    if (confirmEnteredPassword !== enteredPassword) {
      setError('The 2 passwords must match');
      return;
    }

    // console.log(enteredEmail);
    try {
      setError(null);
      const resp = await axios.put(
        `${process.env.NEXT_PUBLIC_API}/auth/update`,
        {
          username: enteredUsername,
          email: enteredEmail,
          password: enteredPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );

      // console.log(res);

      const loggingUser = {
        email: enteredEmail,
        password: enteredPassword,
      };

      // sign in with new credentials
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/auth/login`,
        loggingUser
      );

      // console.log(res);

      if (res.data.error) {
        // setShowError(true);
        //   setError(res.data.error);
        console.log(res.data.error);
      } else {
        login(res.data.username, res.data.email, res.data.token);
      }
    } catch (err) {
      console.log(err);
    }
  };

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
      router.push(`/profilo/modifica-profilo`);
    }

    if (locale === 'en') {
      router.push(`/profile/edit-profile`);
    }
  }, [locale]);

  return (
    <Fragment>
      {loading ? (
        <SpinningLoader />
      ) : (
        <UserRoute>
          <div>Profil ändern {user.username}</div>
          <br></br>
          <MyForm
            formFields={formFields}
            labelCTA={labelCTA}
            formSubmit={formSubmit}
            error={error}
          />
        </UserRoute>
      )}
    </Fragment>
  );
}

export default ProfilBearbeitenPage;
