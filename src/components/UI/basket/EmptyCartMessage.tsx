import { Link } from 'react-router-dom';

const EmptyCartMessage = () => {
  return (
    <p>
      Cart is empty. To add products, go to the{' '}
      <span>
        <Link to={'/catalog'}>catalog page</Link>
      </span>
    </p>
  );
};

export default EmptyCartMessage;
