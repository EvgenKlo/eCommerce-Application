import { useEffect, useState } from 'react';
import { getApiRoot } from '@/api/lib/Client';
import { API } from '@/api/API';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { setAuthorization, setApi } from '@/store/slices/customerSlice';

export const useAuth = () => {
  const [token, setToken] = useState('');
  const [auth, setAuth] = useState(false);
  const [apiClient, setApiClient] = useState(getApiRoot('anonimous'));
  const [apiInstance, setApiInstance] = useState(new API(apiClient));
  const dispatch = useAppDispatch();

  const changeAuth = (flag: boolean): void => {
    setAuth(flag);
  };

  useEffect(() => {
    if (localStorage.getItem('tokendata')) {
      const tokenLS = localStorage.getItem('tokendata') as string;
      setToken(tokenLS || ('' as string));
      setApiClient(getApiRoot('token', { token: token  }));
      setApiInstance(new API(apiClient));
      dispatch(setAuthorization(true));
      dispatch(setApi(apiInstance));
    }
  }, [auth]);
  return [changeAuth];
};
