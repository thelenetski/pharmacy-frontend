import { useForm, SubmitHandler } from 'react-hook-form';
import css from './LoginForm.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup
  .object({
    username: yup
      .string()
      .email('Must be a valid email')
      .required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  })
  .required();

// Типы данных
type LoginFormInputs = yup.InferType<typeof schema>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = data => {
    console.log('Login Data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.loginForm}>
      <div className={css.loginInputsBox}>
        <div>
          <input
            type="text"
            placeholder="Email address"
            {...register('username', { required: 'Username is required' })}
            className={css.loginInput}
          />
          {errors.username && (
            <p className={css.loginInputError}>{errors.username.message}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            {...register('password', { required: 'Password is required' })}
            className={css.loginInput}
          />
          {errors.password && (
            <p className={css.loginInputError}>{errors.password.message}</p>
          )}
        </div>
      </div>
      <button type="submit" className={css.loginButton}>
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
