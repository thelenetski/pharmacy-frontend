import { SubmitHandler, useForm } from 'react-hook-form';
import css from './Filters.module.scss';
import { FiFilter } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { setFilters } from '../../redux/dashboard/slice';
import { selectIsAnyLoading } from '../../redux/selectIsAnyLoading';
import { useEffect, useState } from 'react';

type data = {
  keyword: string;
};

function Filters({ name = 'User Name' }) {
  const { register, handleSubmit } = useForm<data>();
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(selectIsAnyLoading);
  const [load, setLoad] = useState(false);

  const onSubmit: SubmitHandler<data> = data => {
    dispatch(setFilters(data.keyword));
    handler();
  };

  const handler = () => {
    setLoad(true);
  };

  useEffect(() => {
    if (load && !loading) setLoad(false);
  }, [loading]);

  return (
    <form className={css.searchWrap} onSubmit={handleSubmit(onSubmit)}>
      <label>
        <input placeholder={name} {...register('keyword')} />
      </label>
      <button type="submit" disabled={load}>
        {load ? (
          'Loading...'
        ) : (
          <>
            <FiFilter size={14} />
            Filter
          </>
        )}
      </button>
    </form>
  );
}

export default Filters;
