import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

/* 
- children will contain the React components to render

- rest will contain the PrivateRoute component's props inside an object
*/
const PrivateRoute = ({children, ...rest}) => {

  // console.log('children:', children);
  // console.log('rest:', rest);

  const {user} = useAuth0();

  return <Route
    {...rest}
    /* function must be called 'render' for it to be invoked
      to display components */
    render={() => {
      /* if the user is logged in, return the child components
        passed into this route that are to be rendered */
      return user ? children :
        /* if the user hasn't logged in, redirect the user to
          the login page */
        <Redirect to='/'></Redirect>
    }}
  >
  </Route>
};
export default PrivateRoute;
