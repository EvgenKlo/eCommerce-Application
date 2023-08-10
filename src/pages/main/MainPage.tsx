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
    <div className="content">
      <h3>eCommerceApp</h3>
      <p>{JSON.stringify(customers)}</p>
    </div>
  );
};
