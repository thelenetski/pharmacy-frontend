import { useForm, SubmitHandler } from 'react-hook-form';
import css from './SignInForm.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../redux/auth/operations';
import { AppDispatch } from '../../redux/store';
import { selectAuthLoading } from '../../redux/auth/selectors';
import { useEffect, useState } from 'react';

const schema = yup
  .object({
    email: yup
      .string()
      .email('Must be a valid email')
      .required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  })
  .required();

type LoginFormInputs = yup.InferType<typeof schema>;

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(selectAuthLoading);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (loading.signIn) {
      timer = setTimeout(() => {
        setShowMessage(true);
      }, 3000);
    } else {
      setShowMessage(false);
    }

    return () => clearTimeout(timer);
  }, [loading.signIn]);

  const onSubmit: SubmitHandler<LoginFormInputs> = data => {
    dispatch(signIn(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.loginForm}>
      <div className={css.loginInputsBox}>
        <div>
          <input
            type="text"
            placeholder="Email address"
            {...register('email', { required: 'Email is required' })}
            className={css.loginInput}
          />
          {errors.email && (
            <p className={css.loginInputError}>{errors.email.message}</p>
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
      <button
        type="submit"
        className={css.loginButton}
        disabled={loading.signIn}
      >
        {loading.signIn
          ? showMessage
            ? 'Waiting for backend to start...'
            : 'Loading...'
          : 'Log In'}
      </button>
    </form>
  );
};

export default SignInForm;
