import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';

const ProtectedRoute = ({children, path}) => {
  const {isAuth} = useSelector(({user}) => user);

  return (
    <Route
      path={path}
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

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
  path: PropTypes.string.isRequired
};

export default ProtectedRoute;
