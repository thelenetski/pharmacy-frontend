import clsx from 'clsx';
import Logo from '../Logo/Logo';
import css from './Headere.module.scss';
import Sidebar from '../Sidebar/Sidebar';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../../redux/auth/selectors';
import { Link, useLocation } from 'react-router-dom';

interface Props {
  type: string;
}

const Header: React.FC<Props> = ({ type }) => {
  const user = useSelector(selectUserInfo);
  const location = useLocation();

  return (
    <header className={clsx(type === 'full' && css.headerWrap)}>
      <div
        className={clsx(
          css.logoWrap,
          'container',
          type === 'full' && css.logoWrapGap20
        )}
      >
        {type === 'full' && <Sidebar />}
        <Logo type={type} />
        <div className={css.titleBox}>
          {type === 'simple' && <p>E-Pharmacy</p>}
          {type === 'full' && <p>Medicine store</p>}
          {type === 'full' && (
            <span>
              {
                <Link to="/dashboard">
                  {(location.pathname === '/dashboard' && 'Dashboard') ||
                    (location.pathname === '/orders' && 'All orders') ||
                    (location.pathname === '/products' && 'All products') ||
                    (location.pathname === '/suppliers' && 'All suppliers') ||
                    (location.pathname === '/customers' && 'All customers')}
                </Link>
              }{' '}
              | {user}
            </span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
