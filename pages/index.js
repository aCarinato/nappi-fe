import axios from 'axios';
import { useEffect, useState } from 'react';

function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  // const [messageFromServer, setMessageFromServer] = useState('');
  const [products, setProducts] = useState([]);

  const display = products.map((product) => (
    <li key={product._id}>{product.nameIT}</li>
  ));

  const fetchMessage = async () => {
    // let message;
    let resData;
    try {
      setIsLoading(true);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/products/`);
      resData = res.data.products;
      // console.log(res.data);
      setProducts(resData);

      // message = res.data.message;
      // setMessageFromServer(message);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMessage();
  }, []);

  return <div>{isLoading ? <div>Loading</div> : <ul>{display}</ul>}</div>;
}

export default HomePage;
