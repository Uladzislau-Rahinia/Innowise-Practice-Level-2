import React, { SyntheticEvent } from 'react';
import colors from './colors';
import instruments from './instruments';
import {
  ControlPanelWrapper,
  ColorPickerContainer,
  ColorPickerItem,
  LineWidthSlider,
  InstrumentPickerContainer,
  Instrument,
} from './styles';

interface ControlPanelProps {
  handleColorPick: (e: SyntheticEvent) => void;
  handleLineWidthPick: (e: SyntheticEvent) => void;
  handleInstrumentPick: (e: SyntheticEvent) => void;
  pickedInstrument: string;
  pickedColor:string;

}

const ControlPanel = React.memo((props: ControlPanelProps): JSX.Element => {
  const {
    handleColorPick, handleLineWidthPick, handleInstrumentPick, pickedInstrument, pickedColor,
  } = props;
  return (
    <ControlPanelWrapper>
      <ColorPickerContainer>
        {colors.map((value) => (
          <ColorPickerItem
            isPicked={value === pickedColor}
            id={value}
            onClick={handleColorPick}
            color={value}
          />
        ))}
      </ColorPickerContainer>
      <InstrumentPickerContainer>
        {instruments.map((value, index) => (
          <Instrument
            isPicked={index.toString() === pickedInstrument}
            src={value}
            id={index.toString()}
            onClick={handleInstrumentPick}
          />
        ))}
      </InstrumentPickerContainer>
      <LineWidthSlider
        defaultValue={1}
        min={1}
        max={20}
        step={1}
        type="range"
        onChange={handleLineWidthPick}
      />
    </ControlPanelWrapper>
  );
});

export default ControlPanel;
