import { ReactNode, Suspense, useEffect, useState } from 'react';
import css from './SharedLayout.module.scss';
import Loader from '../Loader/Loader';
import { useSelector } from 'react-redux';
import { selectTypeModal } from '../../redux/modal/selectors';
import Header from '../Header/Header';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import AddProductForm from '../AddProductForm/AddProductForm';
import ModalWindow from '../ModalWindow/ModalWindow';
import { modalTypes } from '../../redux/modal/slice';
import ModalConfirm from '../ModalConfirm/ModalConfirm';
import EditProductForm from '../EditProductForm/EditProductForm';
import EditSupplierForm from '../EditSupplierForm/EditSupplierForm';
import AddSupplierForm from '../AddSupplierForm/AddSupplierForm';

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
    <div
      className={clsx(
        document.body.classList.toggle(
          'wrapperBG',
          location.pathname === '/login'
        ),
        css.wrapper
      )}
    >
      <Header type={headerType} />
      <main
        className={clsx(
          css.main,
          'container',
          location.pathname === '/login' && css.mainMiddleContent
        )}
      >
        <Suspense fallback={<Loader />}>{children}</Suspense>
        <ModalWindow>
          {type === modalTypes.addProduct && <AddProductForm />}
          {type === modalTypes.editProduct && <EditProductForm />}
          {type === modalTypes.addSupplier && <AddSupplierForm />}
          {type === modalTypes.editSupplier && <EditSupplierForm />}
          {type === modalTypes.delete && <ModalConfirm />}
        </ModalWindow>
      </main>
    </div>
  );
};

export default SharedLayout;
