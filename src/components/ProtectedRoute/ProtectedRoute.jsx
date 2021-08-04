import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';

export default function ProtectedRoute({children, ...rest}) {
  const {isAuth} = useSelector(({user}) => user);

  return (
    <Route
      {...rest}
      render={({location}) => isAuth ? (
        children
      ) : (
        <Redirect to={{
          pathname: "/login",
          state: {
            from: location
          }
        }}/>
      )}
    />
  );
}