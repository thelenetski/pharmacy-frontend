import { useDispatch } from 'react-redux';
import AllOrders from '../../components/AllProducts/AllOrders';
import css from './AllOrdersPage.module.scss';
import { AppDispatch } from '../../redux/store';
import { useEffect } from 'react';
import { getOrder } from '../../redux/orders/operations';

function AllOrdersPage() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getOrder());
  }, [dispatch]);

  return (
    <div className={css.ordersWrap}>
      <AllOrders />
    </div>
  );
}

export default AllOrdersPage;
