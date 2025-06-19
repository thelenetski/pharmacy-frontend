import { SubmitHandler, useForm } from 'react-hook-form';
import css from './Filters.module.scss';
import { FiFilter } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { setFilters } from '../../redux/dashboard/slice';

type data = {
  keyword: string;
};

function Filters({ name = 'User Name' }) {
  const { register, handleSubmit } = useForm<data>();
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit: SubmitHandler<data> = data => {
    dispatch(setFilters(data.keyword));
  };

  return (
    <form className={css.searchWrap} onSubmit={handleSubmit(onSubmit)}>
      <label>
        <input placeholder={name} {...register('keyword')} />
      </label>
      <button type="submit">
        <FiFilter size={14} />
        Filter
      </button>
    </form>
  );
}

export default Filters;
