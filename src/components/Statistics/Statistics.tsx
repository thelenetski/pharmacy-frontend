import { useSelector } from 'react-redux';
import css from './Statistics.module.scss';
import {
  selectDasboardData,
  selectDasboardLoading,
} from '../../redux/dashboard/selectors';
import { RiDatabase2Line } from 'react-icons/ri';
import Skeleton from 'react-loading-skeleton';
import { LuUsersRound } from 'react-icons/lu';

function Statistics() {
  const data = useSelector(selectDasboardData);
  const loading = useSelector(selectDasboardLoading);

  return (
    <div className={css.statWrap}>
      <div className={css.statBox}>
        <div className={css.statBoxTitle}>
          <RiDatabase2Line size={20} />
          <span>All products</span>
        </div>
        <p>
          {loading.dash ? <Skeleton count={1} width={25} /> : data?.allProducts}
        </p>
      </div>
      <div className={css.statBox}>
        <div className={css.statBoxTitle}>
          <RiDatabase2Line size={20} />
          <span>All suppliers</span>
        </div>
        <p>
          {loading.dash ? (
            <Skeleton count={1} width={25} />
          ) : (
            data?.allSuppliers
          )}
        </p>
      </div>
      <div className={css.statBox}>
        <div className={css.statBoxTitle}>
          <LuUsersRound size={20} />
          <span>All customers</span>
        </div>
        <p>
          {loading.dash ? (
            <Skeleton count={1} width={25} />
          ) : (
            data?.allCustomers
          )}
        </p>
      </div>
    </div>
  );
}

export default Statistics;
