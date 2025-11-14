import React, { Children } from 'react'
import { createContext,useContext,useState } from 'react'

const AuthContext = createContext();

function AuthProvider() {
  return (
    <AuthContext.Provider value={{user , setUser}}>
        {Children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export function useAuth(){
    return useContext(AuthContext)
}