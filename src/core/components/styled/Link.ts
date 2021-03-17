import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ButtonLink = styled(Link)`
  max-width: 220px;
  width: 40%;
  height: 30px;
  background-color: orange;
  border: 0;
  border-radius: 10px;
  color: white;
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
`;

export default ButtonLink;
