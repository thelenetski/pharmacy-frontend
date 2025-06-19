import { RootState } from '../store';

export const selectIsOpenModal = (state: RootState) => state.modal.isOpen;
export const selectTypeModal = (state: RootState) => state.modal.type;
export const selectContentModal = (state: RootState) => state.modal.content;
