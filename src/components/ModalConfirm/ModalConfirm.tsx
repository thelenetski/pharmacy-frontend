import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/modal/slice';
import css from './ModalConfirm.module.scss';
import { AppDispatch } from '../../redux/store';
import { selectContentModal } from '../../redux/modal/selectors';
import { deleteSupplier } from '../../redux/suppliers/operations';
import { deleteProduct } from '../../redux/products/operations';
import { selectIsAnyLoading } from '../../redux/selectIsAnyLoading';
import { useForm } from 'react-hook-form';
import ModalActionControls from '../ModalActionControls/ModalActionControls';

function ModalConfirm() {
  const dispatch = useDispatch<AppDispatch>();
  const content = useSelector(selectContentModal);
  const loading = useSelector(selectIsAnyLoading);
  const { handleSubmit } = useForm({});

  const handleConfirm = () => {
    if (!content) return;

    const action =
      (content.type === 'supplier' && deleteSupplier(content.id)) ||
      (content.type === 'product' && deleteProduct(content.id));

    action &&
      dispatch(action)
        .unwrap()
        .then(() => dispatch(closeModal()))
        .catch(err => {
          console.error('Confirmation error:', err);
          dispatch(closeModal());
        });
  };

  return (
    <div className={css.addProductWrap}>
      <h4 className={css.formTitle}>Are you sure?</h4>
      <form onSubmit={handleSubmit(handleConfirm)}>
        <ModalActionControls loading={loading} name={'Confirm'} />
      </form>
    </div>
  );
}

export default ModalConfirm;
