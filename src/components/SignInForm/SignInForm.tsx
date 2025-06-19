import { useForm, SubmitHandler } from 'react-hook-form';
import css from './SignInForm.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../redux/auth/operations';
import { AppDispatch } from '../../redux/store';
import { selectAuthLoading } from '../../redux/auth/selectors';
import { useEffect, useState } from 'react';
import { FiEye } from 'react-icons/fi';
import { FiEyeOff } from 'react-icons/fi';

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
    reset,
    setError,
    watch,
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(selectAuthLoading);
  const [showMessage, setShowMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const passwordValue = watch('password');

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
    dispatch(signIn(data))
      .unwrap()
      .then(() => {
        reset();
      })
      .catch(error => {
        const message = error.data?.message || 'Login failed';
        const field = message === 'Incorrect password' ? 'password' : 'email';

        setError(field as keyof LoginFormInputs, {
          type: 'server',
          message,
        });
      });
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

        <div className={css.formGroup}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            {...register('password', { required: 'Password is required' })}
            className={css.loginInput}
          />

          {passwordValue && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={css.togglePassword}
            >
              {showPassword ? <FiEye size={18} /> : <FiEyeOff size={18} />}
            </button>
          )}
        </div>
      </div>
      {errors.password && (
        <p className={css.loginInputError}>{errors.password.message}</p>
      )}
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
