import { ReactNode, Suspense, useEffect, useState } from 'react';
import style from './SharedLayout.module.scss';
import Loader from '../Loader/Loader';
import { useSelector } from 'react-redux';
import { selectTypeModal } from '../../redux/modal/selectors';
import Header from '../Header/Header';
import { useLocation } from 'react-router-dom';

interface SharedLayoutProps {
  children: ReactNode;
}

const SharedLayout: React.FC<SharedLayoutProps> = ({ children }) => {
  const type = useSelector(selectTypeModal);
  const location = useLocation();
  const [headerType, setHeaderType] = useState('simple');

  useEffect(() => {
    if (location.pathname === '/login') {
      setHeaderType('simple');
    } else {
      setHeaderType('full');
    }
  }, [location]);

  return (
    <div className={style.wrapper}>
      <Header type={headerType} />
      <main className={style.main}>
        <Suspense fallback={<Loader />}>{children}</Suspense>
        {/* <ModalWindow>
          {type === modalTypes.addProduct && <AddProductForm />}
        </ModalWindow> */}
      </main>
    </div>
  );
};

export default SharedLayout;
