import { useDispatch } from 'react-redux';
import css from './ModalActionControls.module.scss';
import { AppDispatch } from '../../redux/store';
import { closeModal } from '../../redux/modal/slice';

function ModalActionControls({ loading = false, name = 'Add' }) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className={css.controls}>
      <button type="submit" className={css.addBtn} disabled={loading}>
        {loading ? 'Loading...' : name}
      </button>
      <button
        type="button"
        className={css.closeBtn}
        onClick={() => dispatch(closeModal())}
      >
        Cancel
      </button>
    </div>
  );
}

export default ModalActionControls;
