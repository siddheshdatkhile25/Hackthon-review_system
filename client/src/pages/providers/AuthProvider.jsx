import { createContext, useContext, useState, useEffect } from 'react'

// create an empty context
const AuthContext = createContext()

function AuthProvider({ children }) {
  // create state to store logged user information
  const [user, setUser] = useState(null)

  // on component mount, check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      
      setUser({
        uid: localStorage.getItem('uid'),
        firstName: localStorage.getItem('firstName'),
        lastName: localStorage.getItem('lastName'),
        email: localStorage.getItem('email'),
        token: localStorage.getItem('token')
      })
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

// expose the context using custom hook
export function useAuth() {
  return useContext(AuthContext)
}



