import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import userIMG from '../../assets/user.png';

import { Navigate } from 'react-router-dom';
import styles from './Register.module.scss';
import { fetchRegister } from '../../store/slices/auth/auth';

const Register = () => {
  const isAuth = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: 'Vladimir',
      email: 'bobaboba@mail.ru',
      password: '123123',
    },
    mode: 'all',
  });

  const onSubmit = (values) => {
    dispatch(fetchRegister(values)); // ?? async await we need to setItem to localStorage
  };

  if (isAuth) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className={styles.register}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Sign up</h1>
        <img src={userIMG} alt="user" />
        <TextField
          className={styles.field}
          label="Name"
          type="text"
          error={Boolean(errors.name && errors.name.message)}
          helperText={errors.name && errors.name.message}
          {...register('name', { required: 'Enter your name' })}
        />
        <TextField
          className={styles.field}
          label="E-Mail"
          type="email"
          error={Boolean(errors.email && errors.email.message)}
          helperText={errors.email && errors.email.message}
          {...register('email', { required: 'Enter the email' })}
        />
        <TextField
          className={styles.field}
          label="Password"
          type="password"
          {...register('password', { required: 'Enter the password' })}
          error={Boolean(errors.password && errors.password.message)}
          helperText={errors.password && errors.password.message}
        />
        <Button disabled={!isValid} type="submit" size="large" variant="contained">
          Sign up
        </Button>
      </form>
    </div>
  );
};

export default Register;
