import { useContext,createContext } from "react";

export const AuthContext=createContext({
    loginStatus:false,
    username:'',
    updateLoginStatus:(state)=>{},
    updateUserName:(user)=>{}
})

export const useAuth=()=>{
    return useContext(AuthContext)
}
export const AuthProvider=AuthContext.Provider