import React from 'react';
import StyledLink from './styles';

interface LinkProps {
  to: string,
  text: string
}

const ButtonLink = (props: LinkProps): JSX.Element => {
  const { to, text } = props;
  return (
    <StyledLink to={to}>{text}</StyledLink>
  );
};

export default ButtonLink;
