import clsx from 'clsx';
import Logo from '../Logo/Logo';
import css from './Headere.module.scss';

interface Props {
  type: string;
}

const Header: React.FC<Props> = ({ type }) => {
  return (
    <header className={clsx(type === 'full' && css.headerWrap)}>
      <div className={clsx(css.logoWrap, 'container')}>
        <Logo type={type} />
        <div className={css.titleBox}>
          {type === 'simple' && <p>E-Pharmacy</p>}
          {type === 'full' && <p>Medicine store</p>}
          {type === 'full' && <span>Dasboard | vendor@gmail.com</span>}
        </div>
      </div>
    </header>
  );
};

export default Header;
