import styled from 'styled-components';

export const ControlPanelWrapper = styled.div`
    width: 500px;
    height: 400px;
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
    height: 70px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

export const Instrument = styled.img`
    width: 50px;
    height: 50px;
    margin: 20px;
`;

export const ColorPickerItem = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 20px;
    background-color: ${(props) => props.color}
`;

export const LineWidthSlider = styled.input`
    width: 200px;
    height: 10px;
`;
