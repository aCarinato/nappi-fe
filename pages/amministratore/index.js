import React, { useRef, useState } from 'react';
import Link from 'next/link';
// own components
import MyForm from '../../components/form/MyForm';
// own context
import { useMainContext } from '../../context/Context';

function AmministratorePage() {
  const { adminState, loginAdmin, logoutAdmin } = useMainContext();
  const passwordInputRef = useRef();
  const [error, setError] = useState(null);

  const formFields = [
    {
      label: 'Password',
      id: 'password',
      inputType: 'password',
      ref: passwordInputRef,
      defaultValue: '',
    },
  ];
  // const labelCTA,
  const formSubmit = async (e) => {
    e.preventDefault();
    // console.log('click');
    const enteredPassword = passwordInputRef.current.value;
    if (enteredPassword === process.env.NEXT_PUBLIC_ADMIN) {
      loginAdmin();
    } else {
      setError('Password errata');
    }
  };

  const logoutHandler = () => {
    logoutAdmin();
    setError(null);
  };

  //   console.log(adminState);
  // error
  return (
    <div>
      <p>Amministratore</p>
      <br></br>
      {adminState !== null && adminState.isAdmin ? (
        <>
          <div>
            <Link href="/admin/dashboard">Pannello amministratore</Link>
          </div>

          <br></br>
          <div>
            <button onClick={logoutHandler}>Log out</button>
          </div>
        </>
      ) : (
        <MyForm
          formFields={formFields}
          labelCTA="Login"
          formSubmit={formSubmit}
          error={error}
        />
      )}
    </div>
  );
}

export default AmministratorePage;
