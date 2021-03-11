import React, { SyntheticEvent } from 'react';
import StyledButton from './styles';

interface ButtonProps {
  text: string;
  onClick: ()=>void;
}

const Button = (props : ButtonProps) : JSX.Element => {
  const { onClick, text } = props;
  return (
    <StyledButton onClick={onClick}>
      {text}
    </StyledButton>
  );
};

export default Button;
