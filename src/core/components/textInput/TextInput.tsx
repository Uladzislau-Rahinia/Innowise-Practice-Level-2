import React, { SyntheticEvent } from 'react';
import StyledInput from './styles';

interface TextInputProps {
  type: string,
  placeholder: string,
  onChange: (e:SyntheticEvent)=>void,
  value: string,
  maxLength?: number
}

function TextInput(props: TextInputProps): JSX.Element {
  const {
    type, placeholder, onChange, value, maxLength,
  } = props;

  return (
    <StyledInput
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      maxLength={maxLength}
    />
  );
}

TextInput.defaultProps = {
  maxLength: 1000,
};

export default TextInput;
