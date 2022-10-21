import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom"
import axios from 'axios'

export const AuthContext = createContext(null)

const AuthContextProvider = ({children}) => {
    const currentUser = localStorage.getItem('name')
    const [username, setUsername] = useState(currentUser || '')
    const navigate = useNavigate()

    const signIn = async (username, password) => {
        const { data } = await axios.post('/api/v1/login', { username, password })
        localStorage.setItem('token', data.token)
        localStorage.setItem('name', username)
        setUsername(localStorage.getItem('name'))
        console.log('CURRENT USERNAME:', username)
        navigate('/', { replace: true })
    }

    const signOut = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        setUsername(localStorage.getItem('name'))
        navigate('/login', { replace: true })
    }

    const getAuthHeader = () => { return { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }

    return (
        <AuthContext.Provider value={ { setUsername, signIn, username, signOut, getAuthHeader } }>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider