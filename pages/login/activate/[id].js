import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { useEffect, useState } from 'react';
// State
import { useMainContext } from '../../../context/Context';

function ActivateAccount() {
  const { login } = useMainContext();
  //   const router = useRouter();
  const router = useRouter();
  const { query } = router;
  const token = query.id;
  //   console.log(id);

  const [state, setState] = useState({
    username: '',
    token: '',
    buttonText: 'Activate account',
    success: '',
    error: '',
  });

  const {} = state;

  useEffect(() => {
    // let token = id;
    if (token) {
      const { username } = jwt.decode(token);
      setState({ ...state, username, token });
    }
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/auth/signup/activate`,
        { token }
      );
      setState({
        ...state,
        username: '',
        token: '',
        buttonText: 'Activate account',
        // success: res.data.message,
      });
      if (res.data.success) {
        console.log(res);
        // login(
        //   res.data.newUser.username,
        //   res.data.newUser.email,
        //   res.data.newUser.token,
        //   res.data.newUser.isAdmin
        // );
        router.push('/login/activate/confirm');
      }
      //   if (res.data)
    } catch (err) {
      console.log(err);
      //   setState({
      //     ...state,
      //     username: '',
      //     token: '',
      //     buttonText: 'Activate account',
      //     error: res.data.error,
      //   });
    }
  };

  return (
    <div>
      <h1>Activate your account</h1>
      <br></br>
      {/* {success && <div>SUCCESS</div>} */}
      <button onClick={submit}>ACTIVATE</button>
    </div>
  );
}

export default ActivateAccount;
