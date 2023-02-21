import { Button } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../store/slices/auth/auth';
import styles from './Header.module.scss';

const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.user);

  const onHandleLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem('token');
  };

  return (
    <div className={styles.root}>
      <div className="container">
        <div className={styles.header}>
          <Link to="/" className={styles.logo}>
            Vladimir's blog
          </Link>
          {isAuth ? (
            <div>
              <Link to={'/add-post'}>
                <Button variant="contained">Write A post</Button>
              </Link>
              <Link to={'/'}>
                <Button onClick={onHandleLogout} variant="contained" color="error">
                  Log out
                </Button>
              </Link>
            </div>
          ) : (
            <div>
              <Link to={'/login'}>
                <Button variant="contained">Log in</Button>
              </Link>
              <Link to={'/register'}>
                <Button>Sign up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
