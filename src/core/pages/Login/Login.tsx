import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import TextInput from 'core/components/textInput';
import Button from 'core/components/Button';
import { loginUser } from 'core/services/firebaseAuthQueries';
import ToastContainer, { showErrorToast } from 'core/services/showToast';
import LINKS from 'core/utils/constants/links';
import { LoginWrapper, LoginContainer } from './styles';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const handleLogin = async () => {
    if (email === '' || password === '') {
      showErrorToast('Fill all fields please');
      return;
    }

    try {
      const res = await loginUser(email, password);
      console.log(res);
      history.push(LINKS.HOME);
    } catch (e) {
      showErrorToast(e);
    }
  };

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
        <Button onClick={handleLogin} text="Sign In" />
        <Link to="/register">Dont have an account? Sign Up here!</Link>
      </LoginContainer>
      <ToastContainer />
    </LoginWrapper>
  );
};

export default LoginPage;
