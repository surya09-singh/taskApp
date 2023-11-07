import React,{useState,useContext,useEffect, createContext} from 'react';

const AuthContext = createContext()

export function useAuth(){
    return useContext(AuthContext)
}


export const AuthProvider = (props) => {
const [authUser , setAuthUser] = useState(null);
const [isLoggedIn , setisLoggedIn] = useState(localStorage.getItem('login'));

console.log(authUser , 'uuuuu')
const value = {authUser , setAuthUser , isLoggedIn , setisLoggedIn}

return (<AuthContext.Provider value={value
}> {props.children} </AuthContext.Provider>)


}