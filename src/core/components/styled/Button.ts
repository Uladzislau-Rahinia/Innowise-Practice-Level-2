import styled from 'styled-components';

const Button = styled.button<{isDanger?:boolean}>`
  max-width: 220px;
  width: 40%;
  height: 30px;
  background-color:${(props) => (props.isDanger ? 'red' : 'orange')};
  border: 0;
  border-radius: 10px;
  color: white;
  outline: none;
  cursor: pointer;
  font-size: 14px;
`;

export default Button;
