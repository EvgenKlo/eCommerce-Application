import { ReactElement, useEffect, useState } from 'react';
import { API } from '@/api/API';

export const MainPage = (): ReactElement => {
  const [customers, setCustomers] = useState({});

  useEffect(() => {
    API.getCustomers()
      .then((data) => {
        setCustomers(data);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <>
      <h1>eCommerceApp</h1>
      <h5>{JSON.stringify(customers)}</h5>
    </>
  );
};
