import React from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../hooks';
import Modal from './Modal';

const Layout = () => {
  const { signOut } = useAuth();
  const { t } = useTranslation();

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
        <div className="container">
          <Link to="/" className="navbar-brand">{t('hexletChat')}</Link>
          {localStorage.getItem('name') && <button type="button" className="btn btn-primary" onClick={signOut}>{t('logout')}</button>}
        </div>
      </nav>
      <Outlet />
      <Modal />
    </>
  );
};

export default Layout;
