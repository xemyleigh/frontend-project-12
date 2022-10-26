import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import LoginForm from './components/LoginForm';
import NotFoundPage from './components/NotFoundPage';
import Layout from './components/Layout';
import Signup from './components/Signup';
import RequireAuth from './hoc/RequireAuth';
import AuthContextProvider from './hoc/AuthContextProvider';

import ChatPage from './components/ChatPage';

const App = () => {
  console.log(process.env);

  return (
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
};

export default App;
