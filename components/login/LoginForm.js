import { useRouter } from 'next/router';
import { useRef } from 'react';
import BtnCTA from '../UI/BtnCTA';
import classes from './LoginForm.module.css';

import axios from 'axios';

import { useMainContext } from '../../context/Context';

function LoginForm(props) {
  const { login, authState } = useMainContext();

  const { loginMode, onSwitchMode } = props;

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const router = useRouter();
  const { locale } = router;

  const loginHandler = async (e) => {
    e.preventDefault();

    // setShowError(false);
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const loggingUser = {
      email: enteredEmail,
      password: enteredPassword,
    };

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/auth/login`,
        loggingUser
      );

      console.log(res);

      if (res.data.error) {
        // setShowError(true);
        //   setError(res.data.error);
        console.log(res.data.error);
      } else {
        login(res.data.username, res.data.email, res.data.token);
        // router.push(`/profilo/${res.data.username}`);
        //   router.push(`/profilo`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (authState && authState.token) {
    if (locale === 'en') router.push('/profile');
    if (locale === 'it') router.push('/profilo');
    if (locale === 'de') router.push('/profil');
  }

  return (
    <div className={classes.container}>
      {/* <div> */}
      <form className={classes['form-container']}>
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
              locale === 'en' ? 'Login' : locale === 'it' ? 'Login' : 'Login'
            }
            onCLickAction={loginHandler}
          />
        </div>
      </form>
      {/* </div> */}
      <div>
        {locale === 'en'
          ? 'Do not have an account? '
          : locale === 'it'
          ? 'Non hai un account? '
          : 'Haben Sie kein Konto? '}
        <span onClick={onSwitchMode} className={classes.switch}>
          {locale === 'en'
            ? 'Create account '
            : locale === 'it'
            ? 'Crea profilo'
            : 'Konto anlegen'}
        </span>
      </div>
    </div>
  );
}

export default LoginForm;
