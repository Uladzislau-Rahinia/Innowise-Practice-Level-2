import styled from 'styled-components';

export const ControlPanelWrapper = styled.div`
    max-width: 500px;
    min-height: 400px;
    width:90%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

export const ColorPickerContainer = styled.div`
    width: 100%;
    height: 75%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

export const InstrumentPickerContainer = styled.div`
    width: 100%;
    min-height: 70px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

export const Instrument = styled.img<{isPicked:boolean}>`
    width: 50px;
    height: 50px;
    margin: 20px;
    ${(props) => (props.isPicked ? 'border: 2px dotted black;' : '')}
`;

export const ColorPickerItem = styled.div<{isPicked:boolean}>`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 20px;
    background-color: ${(props) => props.color};
    ${(props) => (props.isPicked ? 'padding:5px;' : '')}
`;

export const LineWidthSlider = styled.input`
    width: 200px;
    height: 10px;
    margin: 20px;
`;
