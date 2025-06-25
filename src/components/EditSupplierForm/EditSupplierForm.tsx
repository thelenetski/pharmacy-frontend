import { useDispatch, useSelector } from 'react-redux';
import css from './EditSupplierForm.module.scss';
import { useEffect, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { closeModal } from '../../redux/modal/slice';
import clsx from 'clsx';
import { AppDispatch } from '../../redux/store';
import {
  selectSuppliersLoading,
  selectSuppliersPage,
} from '../../redux/suppliers/selectors';
import { editSupplier, getSuppliers } from '../../redux/suppliers/operations';
import { Dayjs } from 'dayjs';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { Box, Popover } from '@mui/material';
import { selectContentModal } from '../../redux/modal/selectors';
import FormList from '../FormList/FormList';
import { selectFilters } from '../../redux/dashboard/selectors';
import { FiCalendar } from 'react-icons/fi';

interface Data {
  name: string;
  address: string;
  suppliers: string;
  date: string;
  amount: string;
  status: string;
}

const md3Theme = createTheme({
  palette: {
    mode: 'light',
  },
});

const schema = yup.object().shape({
  name: yup.string().required('Info is required'),
  address: yup.string().required('Address is required'),
  suppliers: yup.string().required('Suppliers is required'),
  date: yup.string().required('Date is required'),
  amount: yup.string().required('Amount is required'),
  status: yup.string().required('Status is required'),
});

function EditSupplierForm() {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(selectSuppliersLoading);
  const content = useSelector(selectContentModal);
  const page = useSelector(selectSuppliersPage);
  const filters = useSelector(selectFilters);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [date, setDate] = useState<Dayjs | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: content?.name,
      address: content?.address,
      suppliers: content?.suppliers,
      date: content?.date,
      amount: content?.amount,
      status: content?.status,
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (content?.status) {
      setStatus(content.status);
    }
  }, []);

  const filterHandler = (value = 'active') => {
    setValue('status', value, { shouldValidate: true });
    setStatus(value);
    setOpen(!open);
  };

  const onSubmit: SubmitHandler<Data> = data => {
    const init = async () => {
      try {
        await dispatch(editSupplier({ id: content._id, ...data }))
          .unwrap()
          .catch(e => {
            console.error(e.message);
          });
        dispatch(closeModal());
        dispatch(getSuppliers({ page, filters }));
      } catch (e) {
        console.error(e);
      }
    };
    init();
  };

  return (
    <div className={css.addSupplierWrap}>
      <h4 className={css.formTitle}>Add a new supplier</h4>
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={css.formWrap}>
            <label>
              <input placeholder="Suppliers Info" {...register('name')} />
              {errors.name && (
                <p className={css.error}>{errors.name.message?.toString()}</p>
              )}
            </label>
            <label>
              <input placeholder="Address" {...register('address')} />
              {errors.address && (
                <p className={css.error}>
                  {errors.address.message?.toString()}
                </p>
              )}
            </label>
            <label>
              <input placeholder="Company" {...register('suppliers')} />
              {errors.suppliers && (
                <p className={css.error}>
                  {errors.suppliers.message?.toString()}
                </p>
              )}
            </label>

            <ThemeProvider theme={md3Theme}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box>
                  <label className={css.dateInput}>
                    <input
                      placeholder="Delivery date"
                      {...register('date')}
                      readOnly
                      onClick={event => {
                        setAnchorEl(event.currentTarget);
                      }}
                    />
                    {errors.date && (
                      <p className={css.error}>
                        {errors.date.message?.toString()}
                      </p>
                    )}
                    <FiCalendar size={16} className={css.iconCalendar} />
                  </label>
                  <Popover
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={() => setAnchorEl(null)}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                  >
                    <DateCalendar
                      value={date}
                      onChange={newValue => {
                        setDate(newValue);
                        setValue(
                          'date',
                          newValue?.format('MMMM D, YYYY') || '',
                          {
                            shouldValidate: true,
                          }
                        );
                        setAnchorEl(null);
                      }}
                    />
                  </Popover>
                </Box>
              </LocalizationProvider>
            </ThemeProvider>

            <label>
              <input placeholder="Amount" {...register('amount')} />
              {errors.amount && (
                <p className={css.error}>{errors.amount.message?.toString()}</p>
              )}
            </label>
            <div className={css.catsWrap}>
              <div className={css.filterItemWrap}>
                <div className={css.filterList} onClick={() => setOpen(!open)}>
                  <p
                    className={clsx(
                      css.catTitleWhite,
                      !status && css.catTitleDisabled
                    )}
                  >
                    {!status ? 'Status' : status}
                  </p>
                  <FaChevronDown />
                </div>
                {open && (
                  <FormList
                    data={['Active', 'Deactive']}
                    handler={filterHandler}
                  />
                )}
              </div>
              {errors.status && (
                <p className={css.error}>{errors.status.message?.toString()}</p>
              )}
            </div>
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

export default EditSupplierForm;
