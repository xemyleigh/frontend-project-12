import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';

import LoginForm from './components/LoginForm';
import NotFoundPage from './components/NotFoundPage';
import Layout from './components/Layout';
import Signup from './components/Signup';
import RequireAuth from './hoc/RequireAuth';
import AuthContext from './hoc/AuthContextProvider';
import ChatPage from './components/ChatPage';

const AuthContextProvider = ({ children }) => {
  const currentUser = localStorage.getItem('name');
  const [username, setUsername] = useState(currentUser || '');
  const navigate = useNavigate();

  const signIn = async (newUsername, password) => {
    const { data } = await axios.post('/api/v1/login', { username: newUsername, password });
    localStorage.setItem('token', data.token);
    localStorage.setItem('name', newUsername);
    setUsername(localStorage.getItem('name'));
    navigate('/', { replace: true });
  };

  const signOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    setUsername(localStorage.getItem('name'));
    navigate('/login', { replace: true });
  };

  const getAuthHeader = () => ({ Authorization: `Bearer ${localStorage.getItem('token')}` });

  const getUsername = () => username;

  return (
    <AuthContext.Provider value={{ // eslint-disable-line
      signIn, getUsername, signOut, getAuthHeader,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const App = () => (
  <AuthContextProvider>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={(
            <RequireAuth>
              <ChatPage />
            </RequireAuth>
              )}
        />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<LoginForm />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
    <ToastContainer />
  </AuthContextProvider>
);

export default App;
