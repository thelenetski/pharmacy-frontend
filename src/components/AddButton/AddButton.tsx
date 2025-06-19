import { useDispatch } from 'react-redux';
import css from './AddButton.module.scss';
import { FaPlus } from 'react-icons/fa6';
import { AppDispatch } from '../../redux/store';
import { ModalType, openModal } from '../../redux/modal/slice';

type AddButtonProps = {
  name?: string;
  type: ModalType;
};

function AddButton({ name = 'Add a new product', type }: AddButtonProps) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div
      className={css.buttonWrap}
      onClick={() => dispatch(openModal({ type }))}
    >
      <div className={css.buttonIcon}>
        <FaPlus size={16} className={css.iconPlus} />
      </div>
      {name}
    </div>
  );
}

export default AddButton;
