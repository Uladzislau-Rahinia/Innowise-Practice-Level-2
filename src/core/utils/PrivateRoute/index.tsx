import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import LINKS from 'core/utils/constants/links';
import { useDispatch, useSelector } from 'react-redux';
import getUserData from 'redux/selectors/UserSelector';
import { signInCheck } from 'redux/slices/UserSlice';
import { auth } from 'core/api/firebase';
import Loader from 'core/components/styled/Loader';

const PrivateRoute = ({ component: Component, path }:{component: React.FC, path:string}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) { dispatch(signInCheck(user.uid)); } else dispatch(signInCheck());
    });
  }, []);

  const { isLoggedIn, isPending } = useSelector(getUserData);

  return (
    <Route
      path={path}
      render={() => {
        if (isPending) return <Loader />;
        if (isLoggedIn) return <Component />;
        return <Redirect to={LINKS.LOGIN} />;
      }}
    />
  );
};

export default PrivateRoute;
