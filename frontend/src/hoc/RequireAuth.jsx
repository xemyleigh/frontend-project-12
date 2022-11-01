import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  if (!localStorage.token) { return <Navigate to="/login" />; }
  return children;
};

export default RequireAuth;
