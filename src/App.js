import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import './App.scss';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Sidebar from './components/Sidebar/Sidebar';
import AddPost from './pages/EditPost/AddPost';
import FullPost from './pages/FullPost/FullPost';
import Login from './pages/Login';
import Register from './pages/Register/Register';
import { fetchAuthMe } from './store/slices/auth/auth';

const App = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <div>
      <Header />
      <div className="container">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<FullPost />} />
          <Route path="/post/:id/edit" element={<AddPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
