import React from 'react'
import { Route, Redirect } from 'react-router-dom'
// get the user from autho0
import { useAuth0 } from '@auth0/auth0-react'

// whatever is inside the private route I will return with children
const PrivateRoute = ({ children, ...rest }) => {
 // rest will take the *rest* of parameters
 const { user } = useAuth0()

 return (
  // spread operator
  <Route
   {...rest}
   render={() => {
    return user ? children : <Redirect to="/"></Redirect>
   }}
  ></Route>
 )
}
export default PrivateRoute
