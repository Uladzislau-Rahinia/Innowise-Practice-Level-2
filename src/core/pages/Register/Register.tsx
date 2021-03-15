import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import TextInput from 'core/components/textInput';
import Button from 'core/components/Button';
import ToastContainer, { showErrorToast } from 'core/services/showToast';
import { registerUser } from 'core/services/firebaseAuthQueries';
import { createUser } from 'core/services/firebaseDBQueries';
import LINKS from 'core/utils/constants/links';
import { RegisterWrapper, RegisterContainer } from './styles';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordComfirm, setPasswordConfirm] = useState('');
  const [username, setUsername] = useState('');

  const history = useHistory();

  const handleSignUp = async () => {
    if (email === '' || username === '' || password === '' || passwordComfirm === '') {
      showErrorToast('Fill all fields please');
      return;
    }
    if (password !== passwordComfirm) {
      showErrorToast('Passwords should match');
      return;
    }

    try {
      const registerResult = await registerUser(email, password);
      await createUser(registerResult, username);
      history.push(LINKS.HOME);
    } catch (e) {
      showErrorToast(e);
    }
  };

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
        <Button onClick={handleSignUp} text="Sign Up" />
        <Link to="/login">Already have an account? Sign In here!</Link>
      </RegisterContainer>
      <ToastContainer />
    </RegisterWrapper>
  );
};

export default RegisterPage;
