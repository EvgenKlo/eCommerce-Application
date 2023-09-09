import { useAppSelector } from '@/hooks/reduxHooks';

export const BasketPage = () => {
  const cart = useAppSelector((state) => state.carts.cart);
  return (
    <>
      {cart.lineItems.map((item) => (
        <div key={item.id}>
          <p>{item.id}</p>
          <p>{item.quantity}</p>
        </div>
      ))}
    </>
  );
};
