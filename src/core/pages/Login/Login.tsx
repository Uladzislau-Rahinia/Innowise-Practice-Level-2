import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import TextInput from 'core/components/styled/TextInput';
import Button from 'core/components/styled/Button';
import ToastContainer, { showErrorToast } from 'core/services/showToast';
import LINKS from 'core/utils/constants/links';
import { signIn, clearState } from 'redux/slices/UserSlice';
import getUserData from 'redux/selectors/UserSelector';
import { useDispatch, useSelector } from 'react-redux';

import { LoginWrapper, LoginContainer } from './styles';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { isLoggedIn, isError, errorMessage } = useSelector(getUserData);
  const dispatch = useDispatch();

  const history = useHistory();

  const handleLogin = async () => {
    if (email === '' || password === '') {
      showErrorToast('Fill all fields please');
      return;
    }

    dispatch(signIn({ email, password }));
    // const res = await loginUser(email, password);
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(clearState());
      history.push(LINKS.HOME);
    }

    if (isError) {
      showErrorToast(errorMessage);
      dispatch(clearState());
    }
  }, [isLoggedIn, isError]);

  return (
    <LoginWrapper>
      <span>Mini-Paint</span>
      <LoginContainer>
        <span>Please Login</span>
        <TextInput
          onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
          value={email}
          type="text"
          placeholder="E-mail"
        />
        <TextInput
          onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
          value={password}
          type="password"
          placeholder="Password"
        />
        <Button onClick={handleLogin}>Sign In</Button>
        <Link to="/register">Dont have an account? Sign Up here!</Link>
      </LoginContainer>
      <ToastContainer />
    </LoginWrapper>
  );
};

export default LoginPage;
