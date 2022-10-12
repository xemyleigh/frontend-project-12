import { Navigate } from "react-router-dom"
import useAuth from '../hooks/useAuth'
console.log(useAuth)

const RequireAuth = ({ children }) => {
    if (!localStorage.token) {return <Navigate to='/login' />}

    return (<>{children}</>) 
}

export default RequireAuth