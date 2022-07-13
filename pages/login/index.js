import { Fragment, useState } from 'react';
import LoginForm from '../../components/login/LoginForm';
import SignupForm from '../../components/login/SignupForm';

function LoginPage() {
  const [loginMode, setLoginMode] = useState(true);

  const switchModeHandler = () => {
    setLoginMode((prevState) => !prevState);
  };

  return (
    <Fragment>
      {loginMode ? (
        <LoginForm loginMode={loginMode} onSwitchMode={switchModeHandler} />
      ) : (
        <SignupForm loginMode={loginMode} onSwitchMode={switchModeHandler} />
      )}
    </Fragment>
  );
}

export default LoginPage;
