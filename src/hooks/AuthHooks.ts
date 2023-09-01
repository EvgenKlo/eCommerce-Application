import { useEffect, useState } from 'react';
import { getApiRoot } from '@/api/lib/Client';
import { API } from '@/api/API';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { setAuthorization, setApi, SignInByToken } from '@/store/slices/customerSlice';
import { type TokenStore } from '@commercetools/sdk-client-v2';

export const useAuth = () => {
  const [auth, setAuth] = useState(false);
  const dispatch = useAppDispatch();

  const changeAuth = (flag: boolean): void => {
    setAuth(flag);
  };

  useEffect(() => {
    if (localStorage.getItem('tokendata')) {
      const tokenLS = JSON.parse(localStorage.getItem('tokendata')!) as TokenStore;
      const apiClientType = getApiRoot('token', { token: tokenLS.refreshToken });
      const apiClient = new API(apiClientType);
      void dispatch(setApi(apiClient));
      void dispatch(SignInByToken(tokenLS.refreshToken!));
      void dispatch(setAuthorization(true));
    }
  }, [auth]);
  return [changeAuth];
};
