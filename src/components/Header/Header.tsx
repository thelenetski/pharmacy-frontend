import Logo from '../Logo/Logo';
import css from './Headere.module.scss';

interface Props {
  type: string;
}

const Header: React.FC<Props> = ({ type }) => {
  return (
    <header>
      <div className={css.logoWrap}>
        <Logo />
        <div className={css.titleBox}>
          {type === 'simple' && <p>E-Pharmacy</p>}
        </div>
      </div>
    </header>
  );
};

export default Header;
