import { Fragment, useRef, useState } from 'react';
import classes from './SignupForm.module.css';

import BtnCTA from '../UI/BtnCTA';
import { useRouter } from 'next/router';

import axios from 'axios';

import { useMainContext } from '../../context/Context';

function SignupForm(props) {
  const { loginMode, onSwitchMode } = props;

  const [showForm, setShowForm] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState(null);

  const usernameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const router = useRouter();
  const { locale } = router;

  const { login } = useMainContext();

  const formSubmit = async (e) => {
    e.preventDefault();
    // /api/auth/signup

    setError(null);
    setShowSuccess(false);

    const enteredUsername = usernameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const signupUser = {
      username: enteredUsername,
      email: enteredEmail,
      password: enteredPassword,
    };

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/auth/signup`,
        signupUser
      );

      // console.log(res);

      if (res.data.error) {
        // setShowError(true);
        // setError(res.data.error);
        console.log(res.data.error);
        setError(res.data.error);
      }

      console.log(res);

      if (res.data.success) {
        setShowForm(false);
        setShowSuccess(true);
        // login()
      }

      // else {
      //   login(
      //     res.data.username,
      //     res.data.email,
      //     res.data.token,
      //     res.data.isAdmin
      //   );
      //   // router.push(`/profilo/${res.data.username}`);
      //   if (locale === 'en') router.push(`/profile`);
      //   if (locale === 'it') router.push(`/profilo`);
      //   if (locale === 'de') router.push(`/profil`);
      // }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes.container}>
      {showForm && (
        <Fragment>
          <form className={classes['form-container']}>
            <div className={classes.field}>
              <label className={classes.label} htmlFor="username">
                {locale === 'en'
                  ? 'Username'
                  : locale === 'it'
                  ? 'Nome utente'
                  : 'Nutzername'}
              </label>
              <input
                className={classes.input}
                type="text"
                id="username"
                required
                ref={usernameInputRef}
              />
            </div>
            <div className={classes.field}>
              <label className={classes.label} htmlFor="email">
                Email:
              </label>
              <input
                className={classes.input}
                type="email"
                id="email"
                required
                ref={emailInputRef}
              />
            </div>
            <div className={classes.field}>
              <label className={classes.label} htmlFor="password">
                Password:
              </label>
              <input
                className={classes.input}
                type="password"
                id="password"
                required
                ref={passwordInputRef}
              />
            </div>
            <div className={classes['CTA-wrapper']}>
              <BtnCTA
                type="submit"
                label={
                  locale === 'en'
                    ? 'Sign Up'
                    : locale === 'it'
                    ? 'Crea profilo'
                    : 'Anmeldung'
                }
                onCLickAction={formSubmit}
              />
            </div>
            {error && <p>{error}</p>}
          </form>
          <div>
            {locale === 'en'
              ? 'Already have an account? '
              : locale === 'it'
              ? 'Hai già un account? '
              : 'Sie haben bereits ein Konto? '}
            <span onClick={onSwitchMode} className={classes.switch}>
              Login
            </span>
          </div>
        </Fragment>
      )}
      {showSuccess && (
        <div>
          Success! To activate your account check your email and click the link.{' '}
        </div>
      )}
    </div>
  );
}

export default SignupForm;
