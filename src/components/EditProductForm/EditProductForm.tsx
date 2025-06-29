import { useDispatch, useSelector } from 'react-redux';
import css from './EditProductForm.module.scss';
import { useEffect, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import {
  selectProductCats,
  selectProductLoading,
  selectProductPage,
} from '../../redux/products/selectors';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { closeModal } from '../../redux/modal/slice';
import clsx from 'clsx';
import { editProduct, getProducts } from '../../redux/products/operations';
import { AppDispatch } from '../../redux/store';
import { selectContentModal } from '../../redux/modal/selectors';
import FormList from '../FormList/FormList';
import { selectFilters } from '../../redux/dashboard/selectors';
import ModalActionControls from '../ModalActionControls/ModalActionControls';

export interface Data {
  name: string;
  category: string;
  suppliers: string;
  stock: number;
  price: number;
}

const schema = yup.object().shape({
  name: yup.string().required('Info is required'),
  category: yup.string().required('Category is required'),
  suppliers: yup.string().required('Suppliers is required'),
  stock: yup.number().required('Stock is required'),
  price: yup.number().required('Price is required'),
});

function EditProductForm() {
  const dispatch = useDispatch<AppDispatch>();
  const content = useSelector(selectContentModal);
  const page = useSelector(selectProductPage);
  const loading = useSelector(selectProductLoading);
  const filters = useSelector(selectFilters);
  const [open, setOpen] = useState(false);
  const [catName, setCatName] = useState<string | null>(null);
  const categories = useSelector(selectProductCats);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: content?.name,
      category: content?.category,
      suppliers: content?.suppliers,
      stock: content?.stock,
      price: content?.price,
    },
    resolver: yupResolver(schema),
  });

  const filterHandler = (value = 'Head') => {
    setValue('category', value, { shouldValidate: true });
    setCatName(value);
    setOpen(!open);
  };

  useEffect(() => {
    if (content?.category) {
      setCatName(content.category);
    }
  }, []);

  const onSubmit: SubmitHandler<Data> = data => {
    const init = async () => {
      try {
        await dispatch(editProduct({ id: content._id, ...data }))
          .unwrap()
          .catch(e => {
            console.error(e.message);
          });
        dispatch(closeModal());
        dispatch(getProducts({ page, filters }));
      } catch (e) {
        console.error(e);
      }
    };
    init();
  };

  return (
    <div className={css.addProductWrap}>
      <h4 className={css.formTitle}>Edit product</h4>
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={css.formWrap}>
            <label>
              <input placeholder="Product Info" {...register('name')} />
              {errors.name && (
                <p className={css.error}>{errors.name.message?.toString()}</p>
              )}
            </label>
            <div className={css.catsWrap}>
              <div className={css.filterItemWrap}>
                <div className={css.filterList} onClick={() => setOpen(!open)}>
                  <p
                    className={clsx(
                      css.catTitleWhite,
                      !catName && css.catTitleDisabled
                    )}
                  >
                    {!catName ? 'Category' : catName}
                  </p>
                  <FaChevronDown />
                </div>
                {open && <FormList data={categories} handler={filterHandler} />}
              </div>
              {errors.category && (
                <p className={css.error}>
                  {errors.category.message?.toString()}
                </p>
              )}
            </div>
            <label>
              <input placeholder="Suppliers" {...register('suppliers')} />
              {errors.suppliers && (
                <p className={css.error}>
                  {errors.suppliers.message?.toString()}
                </p>
              )}
            </label>
            <label>
              <input placeholder="Stock" {...register('stock')} />
              {errors.stock && (
                <p className={css.error}>{errors.stock.message?.toString()}</p>
              )}
            </label>
            <label>
              <input placeholder="Price" {...register('price')} />
              {errors.price && (
                <p className={css.error}>{errors.price.message?.toString()}</p>
              )}
            </label>
          </div>
          <ModalActionControls loading={loading.add} name={'Save'} />
        </form>
      </>
    </div>
  );
}

export default EditProductForm;
