import React, {useEffect, useState, FC} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../services/hooks";

import {getCookie} from "../../services/utils";
import {token, request, success} from "../../services/slices/user";
import styles from "../App/App.module.css";
import Loader from "react-loader-spinner";

type TProtectedRoute = {
  path: string;
};

const ProtectedRoute: FC<TProtectedRoute> = ({children, path}) => {
  const [isLoading, setIsLoading] = useState(true)
  const hasAccessToken = getCookie('accessToken');
  const hasRefreshToken = getCookie('refreshToken');
  const dispatch = useAppDispatch();
  const {isRequest} = useAppSelector(({user}) => user);
  useEffect(() => {
    dispatch(request());
    if (hasRefreshToken) {
      dispatch(token());
    } else {
      dispatch(success({isAuth: false}));
    }
  }, []); // eslint-disable-line

  useEffect(() => {
    if (isRequest === false) {
      setIsLoading(isRequest);
    }
  }, [isRequest]);

  if (isLoading || isRequest) {
    return (
      <div className={styles.loader_no_offset_top}>
        <Loader
          type="Oval"
          color="#9C64D9"
          height={100}
          width={100}
        />
      </div>
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

export default ProtectedRoute;
