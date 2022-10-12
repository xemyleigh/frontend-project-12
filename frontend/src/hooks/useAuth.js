import { useContext } from "react"
import { AuthContext } from "../hoc/AuthContextProvider"


const useAuth = () => {
    return useContext(AuthContext)
}

export default useAuth