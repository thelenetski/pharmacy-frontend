import { useDispatch, useSelector } from 'react-redux';
import css from './AddProductForm.module.scss';
import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import {
  selectProductCats,
  selectProductLoading,
} from '../../redux/products/selectors';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { closeModal } from '../../redux/modal/slice';
import clsx from 'clsx';
import { addProduct, getProducts } from '../../redux/products/operations';
import { AppDispatch } from '../../redux/store';
import FormList from '../FormList/FormList';
import { selectFilters } from '../../redux/dashboard/selectors';

type data = {
  name: string;
  category: string;
  suppliers: string;
  stock: number;
  price: number;
};

const schema = yup.object().shape({
  name: yup.string().required('Info is required'),
  category: yup.string().required('Category is required'),
  suppliers: yup.string().required('Suppliers is required'),
  stock: yup
    .number()
    .typeError('Must be a number')
    .required('Stock is required'),
  price: yup
    .number()
    .typeError('Must be a number')
    .required('Price is required'),
});

function AddProductForm() {
  const dispatch = useDispatch<AppDispatch>();
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
    defaultValues: { category: '' },
    resolver: yupResolver(schema),
  });

  const filterHandler = (value = 'Head') => {
    setValue('category', value, { shouldValidate: true });
    setCatName(value);
    setOpen(!open);
  };

  const onSubmit: SubmitHandler<data> = data => {
    const init = async () => {
      try {
        await dispatch(addProduct(data))
          .unwrap()
          .catch(e => {
            console.error(e.message);
          });
        dispatch(getProducts({ page: 1, filters }));
        dispatch(closeModal());
      } catch (e) {
        console.error(e);
      }
    };
    init();
  };

  return (
    <div className={css.addProductWrap}>
      <h4 className={css.formTitle}>Add a new product</h4>
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={css.formWrap}>
            <label>
              <input placeholder="Product Info" {...register('name')} />
              {errors.name && (
                <p className={css.error}>{errors.name.message}</p>
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
                <p className={css.error}>{errors.category.message}</p>
              )}
            </div>
            <label>
              <input placeholder="Suppliers" {...register('suppliers')} />
              {errors.suppliers && (
                <p className={css.error}>{errors.suppliers.message}</p>
              )}
            </label>
            <label>
              <input placeholder="Stock" {...register('stock')} />
              {errors.stock && (
                <p className={css.error}>{errors.stock.message}</p>
              )}
            </label>
            <label>
              <input placeholder="Price" {...register('price')} />
              {errors.price && (
                <p className={css.error}>{errors.price.message}</p>
              )}
            </label>
          </div>

          <div className={css.controls}>
            <button type="submit" className={css.addBtn} disabled={loading.add}>
              {loading.add ? 'Loading...' : 'Add'}
            </button>
            <button
              type="button"
              className={css.closeBtn}
              onClick={() => dispatch(closeModal())}
            >
              Cancel
            </button>
          </div>
        </form>
      </>
    </div>
  );
}

export default AddProductForm;
