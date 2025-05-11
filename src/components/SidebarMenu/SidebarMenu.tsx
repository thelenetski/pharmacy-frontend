import { Link, useLocation } from 'react-router-dom';
import css from './SidebarMenu.module.scss';
import clsx from 'clsx';
import { TbLayoutDashboardFilled } from 'react-icons/tb';
import { IoMdCart } from 'react-icons/io';
import { FaFlask } from 'react-icons/fa';
import { MdLocalPharmacy } from 'react-icons/md';
import { HiUsers } from 'react-icons/hi';

function SidebarMenu() {
  const location = useLocation();

  return (
    <div className={css.linksWrap}>
      <Link
        to="/dashboard"
        className={clsx(location.pathname === '/dashboard' && css.active)}
      >
        <TbLayoutDashboardFilled />
      </Link>
      <Link
        to="/orders"
        className={clsx(location.pathname === '/orders' && css.active)}
      >
        <IoMdCart size={13} />
      </Link>
      <Link
        to="/products"
        className={clsx(location.pathname === '/products' && css.active)}
      >
        <FaFlask />
      </Link>
      <Link
        to="/suppliers"
        className={clsx(location.pathname === '/suppliers' && css.active)}
      >
        <MdLocalPharmacy />
      </Link>
      <Link
        to="/customers"
        className={clsx(location.pathname === '/customers' && css.active)}
      >
        <HiUsers />
      </Link>
    </div>
  );
}

export default SidebarMenu;
