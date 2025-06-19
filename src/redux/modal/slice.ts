import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const modalTypes = {
  addProduct: 'add-product',
  addSupplier: 'add-supplier',
  editProduct: 'edit-product',
  editSupplier: 'edit-supplier',
  delete: 'delete',
} as const;

export type ModalType = (typeof modalTypes)[keyof typeof modalTypes];

interface ModalState {
  isOpen: boolean;
  type?: ModalType | null;
  content?: any;
}

const initialState: ModalState = {
  isOpen: false,
  type: null,
  content: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(
      state,
      action: PayloadAction<{
        type: ModalType;
        content?: any;
      }>
    ) {
      state.isOpen = true;
      state.type = action.payload.type;
      state.content = action.payload.content ?? null;
    },
    closeModal(state) {
      state.isOpen = false;
      state.type = null;
      state.content = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
