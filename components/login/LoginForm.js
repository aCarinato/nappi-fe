import { useRouter } from 'next/router';
import { useRef } from 'react';
import BtnCTA from '../UI/BtnCTA';
import classes from './LoginForm.module.css';

function LoginForm(props) {
  const { loginMode, onSwitchMode } = props;

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const router = useRouter();
  const { locale } = router;

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
            onCLickAction={() => {}}
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
