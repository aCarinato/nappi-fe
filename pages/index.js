import axios from 'axios';
import { useEffect, useState } from 'react';

function HomePage() {
  const [messageFromServer, setMessageFromServer] = useState('');

  const fetchMessage = async () => {
    let message;
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/products`);

      message = res.data.message;
      setMessageFromServer(message);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchEvents = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_GIROQ}/events/`);
    //Extract the Array contained in the 'events' field.
    const events = res.data;
    console.log(events);
  };

  useEffect(() => {
    fetchMessage();
    fetchEvents();
  }, []);

  return <div>{messageFromServer}</div>;
}

export default HomePage;
