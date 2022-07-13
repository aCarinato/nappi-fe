import { useRef } from 'react';
import classes from './SignupForm.module.css';

import BtnCTA from '../UI/BtnCTA';
import { useRouter } from 'next/router';

function SignupForm(props) {
  const { loginMode, onSwitchMode } = props;

  const usernameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const router = useRouter();
  const { locale } = router;

  return (
    <div className={classes.container}>
      {/* <div> */}
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
            onCLickAction={() => {}}
          />
        </div>
      </form>
      {/* </div> */}
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
    </div>
  );
}

export default SignupForm;
