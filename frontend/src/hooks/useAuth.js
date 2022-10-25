import { useContext } from "react"
import ApiContext from "../hoc/ApiContextProvider"
import { AuthContext } from "../hoc/AuthContextProvider"


export const useAuth = () => {
    return useContext(AuthContext)
}

export const useApi = () => {
    return useContext(ApiContext)
}

