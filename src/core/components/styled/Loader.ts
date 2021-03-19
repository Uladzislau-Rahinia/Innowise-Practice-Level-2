import styled from 'styled-components';
import loader from 'core/assets/loader.gif';

const Loader = styled.img.attrs({ src: loader })`
    position: absolute;
    top: calc(50% - 32px);
    left: calc(50% - 32px);
`;

export default Loader;
