import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/modal/slice';
import { selectIsOpenModal } from '../../redux/modal/selectors';
import styles from './ModalWindow.module.scss';
import { createPortal } from 'react-dom';
import { ReactNode, useEffect } from 'react';

interface ModalWindowProps {
  children: ReactNode;
}

const ModalWindow: React.FC<ModalWindowProps> = ({ children }) => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsOpenModal);

  const closeModalHandler = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isOpen]);

  const modalRoot = document.getElementById('modal-root') as HTMLElement | null;

  return modalRoot
    ? createPortal(
        <>
          <Modal
            isOpen={isOpen}
            onRequestClose={closeModalHandler}
            className={styles.modalWrapper}
            ariaHideApp={false}
            overlayClassName={styles.modalOverlay}
          >
            <button className={styles.btnClose} onClick={closeModalHandler}>
              <svg>
                <use href="/sprite.svg#close"></use>
              </svg>
            </button>
            <div className={styles.modalContent}>{children}</div>
          </Modal>
        </>,
        modalRoot
      )
    : null;
};

export default ModalWindow;
