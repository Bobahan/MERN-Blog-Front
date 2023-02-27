import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Button, TextField } from '@mui/material';
import styles from './Form.module.scss';
import { fetchAuth } from '../store/slices/auth/auth';

const Login = () => {
  const isAuth = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [error, setError] = React.useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'all',
  });

  const onSubmit = async (values) => {
    let data = await dispatch(fetchAuth(values));
    if (!data.payload['token']) {
      setError(data.payload);
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className="container">
      <div className={styles.form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h1>Login</h1>
          </div>
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
          {error && <h1 style={{ color: '#d32f2f', textAlign: 'center' }}>{error}</h1>}
          <div>
            {' '}
            <Button disabled={!isValid} type="submit" size="large" variant="contained">
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
