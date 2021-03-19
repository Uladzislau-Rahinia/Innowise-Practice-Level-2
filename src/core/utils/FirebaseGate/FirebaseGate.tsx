import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getUserData from 'redux/selectors/UserSelector';
import { signInCheckResult } from 'redux/slices/UserSlice';
import { auth } from 'core/api/firebase';
import Loader from 'core/components/styled/Loader';

const FirebaseGate = ({ children }:{ children:JSX.Element }):JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(signInCheckResult(user.uid));
      } else {
        dispatch(signInCheckResult());
      }
    });
  }, []);

  const { isPending } = useSelector(getUserData);

  if (isPending) {
    return <Loader />;
  }
  return children;
};

export default FirebaseGate;
