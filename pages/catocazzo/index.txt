import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
// own components
import UserRoute from '../../components/routes/UserRoute';
import { useMainContext } from '../../context/Context';

function catocazzo() {
  const { authState } = useMainContext();

  const funzi = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/order/accazzo`,
      {
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
      }
    );

    console.log(res);
  };
  useEffect(() => {
    funzi();
  }, []);
  return <div>catocazzo</div>;
}

export default catocazzo;
