import { useContext } from 'react';
import ApiContext from '../hoc/ApiContextProvider';
import { AuthContext } from '../hoc/AuthContextProvider';

export const useAuth = () => useContext(AuthContext);

export const useApi = () => useContext(ApiContext);
