import React, { useContext, useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const UserContext = React.createContext()
export const UserProvider = ({ children }) => {

  /* data provided by Auth0 */
  const {
    isAuthenticated, /* user has been authenticated and logged in */
    loginWithRedirect, /* function to login user then redirect on success */
    logout, /* function to log the user out */
    user, /* object with user data such as email address */
    isLoading /* Auth0 is busy logging the user in or out */
  } = useAuth0();

  const [curUser, setCurUser] = useState(null);

  useEffect(() => {
    // console.log('user:', user);
    // console.log('isAuthenticated:', isAuthenticated);
    // console.log('isLoading:', isLoading);
    
    setCurUser(user);

  }, [user]);

  return (
    <UserContext.Provider value={{
      curUser,
      loginWithRedirect,
      logout
    }}>{children}</UserContext.Provider>
  )
}
// make sure use
export const useUserContext = () => {
  return useContext(UserContext)
}
