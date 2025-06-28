import LogoImg from '/favicon/logo.png';
import css from './Logo.module.scss';
import clsx from 'clsx';

interface Props {
  type: string;
}

const Logo: React.FC<Props> = ({ type }) => {
  return (
    <img
      className={clsx(css.logo, type === 'full' && css.imgWidthFull)}
      src={LogoImg}
      alt="logo"
    />
  );
};

export default Logo;
