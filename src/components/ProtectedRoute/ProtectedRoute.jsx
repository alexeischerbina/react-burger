import React, {useCallback, useEffect, useState} from 'react';
import {Route, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';

import {getCookie} from "../../services/utils";
import {token} from "../../services/slices/user";
import styles from "../App/App.module.css";
import Loader from "react-loader-spinner";

const ProtectedRoute = ({children, path}) => {
  const [isLoading, setIsLoading] = useState(true);
  const hasAccessToken = getCookie('accessToken');
  const hasRefreshToken = getCookie('refreshToken');
  // console.log('ProtectedRoute accessToken', getCookie('accessToken'),'refreshToken', getCookie('refreshToken'))
  const updateRefreshToken = useCallback(async () => {
    if (hasRefreshToken) {
      await token();
    }
    setIsLoading(false);
  }, [hasRefreshToken]);
  useEffect(() => {
    updateRefreshToken().catch(err => {
      console.log(err);
    });
  }, [updateRefreshToken]);

  if (isLoading) {
    return (
      <Loader
        className={styles.loader_no_offset_top}
        type="Oval"
        color="#9C64D9"
        height={100}
        width={100}
      />
    );
  }

  return (
    <Route
      path={path}
      render={({location}) => hasAccessToken && hasRefreshToken ? (
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
