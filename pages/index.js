import axios from 'axios';
import { useEffect, useState } from 'react';

function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [messageFromServer, setMessageFromServer] = useState('');

  const fetchMessage = async () => {
    let message;
    try {
      setIsLoading(true);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/products/`);

      message = res.data.message;
      setMessageFromServer(message);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMessage();
  }, []);

  return <div>{isLoading ? <div>Loading</div> : messageFromServer}</div>;
}

export default HomePage;
