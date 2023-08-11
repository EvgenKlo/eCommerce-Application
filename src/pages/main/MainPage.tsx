import { useAppSelector } from '@/hooks/reduxHooks';

export const MainPage: React.FC = () => {
  const customer = useAppSelector((state) => state.customers.customer);

  return <h3>Hello {customer.firstName} !</h3>;
};
