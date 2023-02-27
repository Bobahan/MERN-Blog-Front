import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { Button, TextField } from '@mui/material';
import userIMG from '../assets/user.png';
import styles from './Form.module.scss';
import { uploadAPI } from '../API/API';
import { fetchRegister } from '../store/slices/auth/auth';

const Register = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.user);
  const [avatarURL, setImg] = React.useState('');
  const [error, setError] = React.useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      avatarURL: '',
    },
    mode: 'all',
  });

  const onSubmit = async (values) => {
    let data = await dispatch(fetchRegister(values));
    if (!data.payload['token']) {
      setError(data.payload);
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  const uploadPhoto = async (img) => {
    const { data } = await uploadAPI.uploadIMG(img.target.files[0]);
    setImg(data.url);
    setValue('avatarURL', data.url);
  };

  if (isAuth) {
    return <Navigate to={'/'} />;
  }

  console.log(isAuth);

  return (
    <div className="container">
      <div className={styles.form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h1>Sign up</h1>
          </div>
          {avatarURL ? (
            <img width={450} src={`http://localhost:4444${avatarURL}`} />
          ) : (
            <img src={userIMG} alt="user" />
          )}
          <Button component="label">
            Upload photo
            <input hidden accept="image/*" multiple type="file" onChange={uploadPhoto} />
          </Button>
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
          {error && <h1 style={{ color: '#d32f2f', textAlign: 'center' }}>{error}</h1>}
          <div>
            {' '}
            <Button disabled={!isValid} type="submit" size="large" variant="contained">
              Sign up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
