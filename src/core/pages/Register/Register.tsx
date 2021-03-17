import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import TextInput from 'core/components/styled/TextInput';
import Button from 'core/components/styled/Button';
import ToastContainer, { showErrorToast } from 'core/services/showToast';
import LINKS from 'core/utils/constants/links';
import { clearState, signUp } from 'redux/slices/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import getUserData from 'redux/selectors/UserSelector';
import { RegisterWrapper, RegisterContainer } from './styles';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordComfirm, setPasswordConfirm] = useState('');
  const [username, setUsername] = useState('');

  const history = useHistory();

  const dispatch = useDispatch();
  const { isError, isLoggedIn, errorMessage } = useSelector(getUserData);

  const handleSignUp = async () => {
    if (
      email === ''
      || username === ''
      || password === ''
      || passwordComfirm === ''
    ) {
      showErrorToast('Fill all fields please');
      return;
    }
    if (password !== passwordComfirm) {
      showErrorToast('Passwords should match');
      return;
    }

    dispatch(signUp({ email, password, username }));
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(clearState());
      history.push(LINKS.HOME);
    }
    if (isError) {
      dispatch(clearState());
      showErrorToast(errorMessage);
    }
  });

  return (
    <RegisterWrapper>
      <span>Mini-Paint</span>
      <RegisterContainer>
        <span>Please Register</span>
        <TextInput
          onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
          value={email}
          type="text"
          placeholder="E-mail"
        />
        <TextInput
          onChange={(e) => setUsername((e.target as HTMLInputElement).value)}
          value={username}
          type="text"
          placeholder="Username"
        />
        <TextInput
          onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
          value={password}
          type="password"
          placeholder="Password"
        />
        <TextInput
          onChange={(e) => setPasswordConfirm((e.target as HTMLInputElement).value)}
          value={passwordComfirm}
          type="password"
          placeholder="Comfirm password"
        />
        <Button onClick={handleSignUp}>Sign Up</Button>
        <Link to="/login">Already have an account? Sign In here!</Link>
      </RegisterContainer>
      <ToastContainer />
    </RegisterWrapper>
  );
};

export default RegisterPage;
