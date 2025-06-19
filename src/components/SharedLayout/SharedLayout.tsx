import { ReactNode, Suspense, useEffect, useState } from 'react';
import style from './SharedLayout.module.scss';
import Loader from '../Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
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
import { deleteProduct } from '../../redux/products/operations';
import { AppDispatch } from '../../redux/store';

interface SharedLayoutProps {
  children: ReactNode;
}

const SharedLayout: React.FC<SharedLayoutProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
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
        location.pathname === '/login' && 'wrapperBG',
        style.wrapper
      )}
    >
      <Header type={headerType} />
      <main className={clsx(style.main, 'container')}>
        <Suspense fallback={<Loader />}>{children}</Suspense>
        <ModalWindow>
          {type === modalTypes.addProduct && <AddProductForm />}
          {type === modalTypes.editProduct && <EditProductForm />}
          {type === modalTypes.addSupplier && <AddSupplierForm />}
          {type === modalTypes.editSupplier && <EditSupplierForm />}
          {type === modalTypes.delete && (
            <ModalConfirm
              onConfirm={content => dispatch(deleteProduct(content)).unwrap()}
            />
          )}
        </ModalWindow>
      </main>
    </div>
  );
};

export default SharedLayout;
