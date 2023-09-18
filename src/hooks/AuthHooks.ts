import { useEffect, useState } from 'react';
import { getApiRoot } from '@/api/lib/Client';
import { API } from '@/api/API';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { setAuthorization, setApi, SignInByToken, isLoading } from '@/store/slices/customerSlice';
import { getActiveCart, createCart, getDiscountList } from '@/store/slices/cartSlice';
import { type TokenStore } from '@commercetools/sdk-client-v2';
import { ClientType } from '@/types/Enums';

export const useAuth = () => {
  const [auth, setAuth] = useState(false);
  const dispatch = useAppDispatch();

  const changeAuth = (flag: boolean): void => {
    setAuth(flag);
  };

  useEffect(() => {
    if (localStorage.getItem('tokendata')) {
      dispatch(isLoading(true));
      const tokenLS = JSON.parse(localStorage.getItem('tokendata')!) as TokenStore;
      const apiClientType = getApiRoot(ClientType.token, { token: tokenLS.refreshToken });
      const apiClient = new API(apiClientType);
      void dispatch(setApi(apiClient));
      void dispatch(SignInByToken(tokenLS.refreshToken!));
      void dispatch(setAuthorization(true));
    } else {
      dispatch(isLoading(false));
    }
    void dispatch(getActiveCart()).then((data) => {
      !data.payload && void dispatch(createCart());
    });
    void dispatch(getDiscountList());
  }, [auth]);
  return [changeAuth];
};
