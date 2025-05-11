import { IoLogOut } from 'react-icons/io5';
import css from './LogoutBtn.module.scss';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { logOut } from '../../redux/auth/operations';

function LogoutBtn() {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <button className={css.logOut} onClick={() => dispatch(logOut())}>
      <IoLogOut size={14} />
    </button>
  );
}

export default LogoutBtn;
