import React from 'react';
import LoginForm from './components/LoginForm';
import NotFoundPage from './components/NotFoundPage';
import Layout from './components/Layout' 
import Signup from './components/Signup';
import { Routes, Route } from 'react-router-dom';
import RequireAuth from './hoc/RequireAuth'
import AuthContextProvider from './hoc/AuthContextProvider';
import ApiContextProvider from './hoc/ApiContextProvider';

import ChatPage from './components/ChatPage';

const App = () => {

  console.log(localStorage.getItem('token'))

  return (
    <AuthContextProvider>
      <ApiContextProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={
                <RequireAuth>
                  <ChatPage />
                </RequireAuth>
            } />
            <Route path='signup' element={<Signup />} />
            <Route path='login' element={<LoginForm />} />
            <Route path='*' element={<NotFoundPage />}/>
          </Route>
        </Routes>
      </ApiContextProvider>
    </AuthContextProvider>
  )
};

export default App;
