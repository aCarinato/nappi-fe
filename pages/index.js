import axios from 'axios';
import { useEffect, useState } from 'react';

function HomePage() {
  const [messageFromServer, setMessageFromServer] = useState('');

  const fetchMessage = async () => {
    let message;
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/products/`);

      message = res.data.message;
      setMessageFromServer(message);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMessage();
  }, []);

  return <div>{messageFromServer}</div>;
}

export default HomePage;
