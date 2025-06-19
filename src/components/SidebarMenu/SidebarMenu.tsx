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
        <TbLayoutDashboardFilled size={14} />
      </Link>
      <Link
        to="/orders"
        className={clsx(location.pathname === '/orders' && css.active)}
      >
        <IoMdCart size={14} />
      </Link>
      <Link
        to="/products"
        className={clsx(location.pathname === '/products' && css.active)}
      >
        <FaFlask size={14} />
      </Link>
      <Link
        to="/suppliers"
        className={clsx(location.pathname === '/suppliers' && css.active)}
      >
        <MdLocalPharmacy size={14} />
      </Link>
      <Link
        to="/customers"
        className={clsx(location.pathname === '/customers' && css.active)}
      >
        <HiUsers size={14} />
      </Link>
    </div>
  );
}

export default SidebarMenu;
