import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom"
import axios from 'axios'

export const AuthContext = createContext(null)

export const AuthContextProvider = ({children}) => {
    console.log(children)
    const [username, setUsername] = useState('')
    const navigate = useNavigate()

    const signIn = async (username, password) => {
        const { data } = await axios.post('/api/v1/login', { username, password })
        localStorage.setItem('token', data.token)
        console.log(data);
        setUsername(data.username)
        navigate('/', { replace: true })
    }

    const signOut = () => {
        localStorage.removeItem('token')
        setUsername('')
        // return <Navigate to='/login' />
        navigate('/login', { replace: true })
    }

    const getAuthHeader = () => { return { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }

    return (
        <AuthContext.Provider value={ { setUsername, signIn, username, signOut, getAuthHeader } }>
            {children}
        </AuthContext.Provider>
    )
}