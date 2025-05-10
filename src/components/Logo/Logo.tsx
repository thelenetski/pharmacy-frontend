import LogoImg from '/favicon/logo.png';
import css from './Logo.module.scss';

interface Props {
  type: string;
}

const Logo: React.FC<Props> = ({ type }) => {
  return (
    <img
      className={css.logo}
      src={LogoImg}
      alt="logo"
      style={{
        width: type === 'full' ? 32 : 44,
        height: type === 'full' ? 32 : 44,
      }}
    />
  );
};

export default Logo;
