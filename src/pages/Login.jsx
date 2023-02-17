import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchAuth } from '../store/slices/auth/auth';
import styles from './Login.module.scss';

const Login = () => {
  const isAuth = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: 'bobba@mail.ru',
      password: '123asdsd',
    },
    mode: 'all',
  });

  const onSubmit = async (values) => {
    let data = await dispatch(fetchAuth(values));
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    } else {
      alert('Не удалось авторизоваться');
    }
  };

  if (isAuth) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className={styles.register}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Login</h1>
        <TextField
          className={styles.field}
          label="E-Mail"
          type="email"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: 'Enter the email' })}
        />
        <TextField
          className={styles.field}
          label="Password"
          type="password"
          {...register('password', { required: 'Enter the password' })}
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
        />
        <Button disabled={!isValid} type="submit" size="large" variant="contained">
          Login
        </Button>
      </form>
    </div>
  );
};
export default Login;
