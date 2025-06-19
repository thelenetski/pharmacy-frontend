import { useDispatch } from 'react-redux';
import css from './DashboardPage.module.scss';
import { AppDispatch } from '../../redux/store';
import { useEffect } from 'react';
import { getDash } from '../../redux/dashboard/operations';
import 'react-loading-skeleton/dist/skeleton.css';
import Statistics from '../../components/Statistics/Statistics';
import RecentCustomers from '../../components/RecentCustomers/RecentCustomers';
import IncomeExpenses from '../../components/IncomeExpenses/IncomeExpenses';
import { setSignOut } from '../../redux/auth/slice';

function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    try {
      dispatch(getDash());
    } catch {
      dispatch(setSignOut());
    }
  }, [dispatch]);

  return (
    <div className={css.dashWrap}>
      <Statistics />
      <RecentCustomers />
      <IncomeExpenses />
    </div>
  );
}

export default DashboardPage;
