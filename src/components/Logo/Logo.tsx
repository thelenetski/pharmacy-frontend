import LogoImg from '/favicon/logo.png';
import css from './Logo.module.scss';
import clsx from 'clsx';
import { useLocation } from 'react-router-dom';

interface Props {
  type: string;
}

const Logo: React.FC<Props> = ({ type }) => {
  const location = useLocation();

  return (
    <img
      className={clsx(
        css.logo,
        type === 'full' && css.imgWidthFull,
        location.pathname !== '/login' && css.imgPosition
      )}
      src={LogoImg}
      alt="logo"
    />
  );
};

export default Logo;
