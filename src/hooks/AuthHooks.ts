import { useEffect, useState } from 'react';
import { getApiRoot } from '@/api/lib/Client';
import { API } from '@/api/API';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { setAuthorization, setApi, SignInByToken } from '@/store/slices/customerSlice';
import { type TokenStore } from '@commercetools/sdk-client-v2';

export const useAuth = () => {
  const [auth, setAuth] = useState(false);
  const [apiClient, setApiClient] = useState(getApiRoot('anonimous'));
  const [apiInstance, setApiInstance] = useState(new API(apiClient));
  const dispatch = useAppDispatch();

  const changeAuth = (flag: boolean): void => {
    setAuth(flag);
  };

  useEffect(() => {
    if (localStorage.getItem('tokendata')) {
      const tokenLS = JSON.parse(localStorage.getItem('tokendata')!) as TokenStore;
      setApiClient(getApiRoot('token', { token: tokenLS.refreshToken }));
      setApiInstance(new API(apiClient));
      void dispatch(setAuthorization(true));
      void dispatch(setApi(apiInstance));
      void dispatch(SignInByToken(tokenLS.refreshToken!));
    }
  }, [auth]);
  return [changeAuth];
};
