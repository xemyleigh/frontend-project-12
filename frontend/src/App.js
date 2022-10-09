import React from 'react';
import LoginForm from './components/LoginForm';
import NotFoundPage from './components/NotFoundPage';
import Home from './components/Home';
import Layout from './components/Layout' 
import { Routes, Rote, Link, Route } from 'react-router-dom';

const App = () => {
  return (
    <>
      <header>
      </header>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='login' element={<LoginForm />} />
          <Route path='*' element={<NotFoundPage />}/>
        </Route>
      </Routes>
    </>
  )
};

export default App;
