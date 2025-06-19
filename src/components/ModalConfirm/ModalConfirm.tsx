import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/modal/slice';
import css from './ModalConfirm.module.scss';
import { AppDispatch } from '../../redux/store';
import { selectContentModal } from '../../redux/modal/selectors';
import { selectProductLoading } from '../../redux/products/selectors';

type ModalConfirmProps = {
  onConfirm: (content: any) => Promise<any>;
};

function ModalConfirm({ onConfirm }: ModalConfirmProps) {
  const dispatch = useDispatch<AppDispatch>();
  const content = useSelector(selectContentModal);
  const loading = useSelector(selectProductLoading);

  const handleConfirm = () => {
    if (!content) return;

    onConfirm(content)
      .then(() => dispatch(closeModal()))
      .catch(err => {
        console.error('Confirmation error:', err);
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
            disabled={loading.product}
          >
            {loading.product ? 'Loading...' : 'Confirm'}
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
