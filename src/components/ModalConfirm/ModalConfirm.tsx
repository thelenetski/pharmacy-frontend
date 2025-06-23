import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/modal/slice';
import css from './ModalConfirm.module.scss';
import { AppDispatch } from '../../redux/store';
import { selectContentModal } from '../../redux/modal/selectors';
import { selectProductLoading } from '../../redux/products/selectors';
import { deleteSupplier } from '../../redux/suppliers/operations';
import { deleteProduct } from '../../redux/products/operations';
import { selectSuppliersLoading } from '../../redux/suppliers/selectors';

function ModalConfirm() {
  const dispatch = useDispatch<AppDispatch>();
  const content = useSelector(selectContentModal);
  const loading1 = useSelector(selectProductLoading);
  const loading2 = useSelector(selectSuppliersLoading);

  const loading =
    (content.type === 'supplier' && loading2.supplier) ||
    (content.type === 'product' && loading1.product);

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
      <>
        <div className={css.controls}>
          <button
            type="button"
            className={css.addBtn}
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Confirm'}
          </button>
          <button
            type="button"
            className={css.closeBtn}
            onClick={() => dispatch(closeModal())}
          >
            Cancel
          </button>
        </div>
      </>
    </div>
  );
}

export default ModalConfirm;
