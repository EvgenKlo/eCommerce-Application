import { ReactElement, useEffect, useState } from 'react';
import { API } from '@/api/API';

export const MainPage = (): ReactElement => {
  const [project, setProject] = useState({});

  const getProject = async () => {
    const data = await API.getProject();
    setProject(data);
  };

  useEffect(() => {
    getProject()
      .then(() => {})
      .catch((err) => console.error(err));
  }, []);
  return (
    <>
      <h1>eCommerceApp</h1>
      <h5>{JSON.stringify(project)}</h5>
    </>
  );
};
