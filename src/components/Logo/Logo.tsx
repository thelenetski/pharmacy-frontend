import LogoImg from '/favicon/logo.png';
import css from './Logo.module.scss';

const Logo = () => {
  return <img className={css.logo} src={LogoImg} alt="logo" />;
};

export default Logo;
