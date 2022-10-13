import React from 'react';
import LoginForm from './components/LoginForm';
import NotFoundPage from './components/NotFoundPage';
import Home from './components/Home';
import Layout from './components/Layout' 
import { Routes, Route } from 'react-router-dom';
import RequireAuth from './hoc/RequireAuth'
import { AuthContextProvider } from './hoc/AuthContextProvider';

import ChatPage from './components/ChatPage';


const App = () => {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
           <Route index element={
              // <RequireAuth>
                <ChatPage />
              // </RequireAuth>
           }/>
          <Route path='login' element={<LoginForm />} />
          <Route path='*' element={<NotFoundPage />}/>
        </Route>
      </Routes>
    </AuthContextProvider>
  )
};

export default App;
