import React, { SyntheticEvent } from 'react';
import colors from 'core/utils/constants/colors';
import brush from 'core/assets/brush.png';
import rect from 'core/assets/rect.png';
import circle from 'core/assets/circle.png';
import {
  ControlPanelWrapper,
  ColorPickerContainer,
  ColorPickerItem,
  LineWidthSlider,
  InstrumentPickerContainer,
  Instrument,
} from './styles';

const instruments = [brush, rect, circle];

interface ControlPanelProps {
  handleColorPick: (e: SyntheticEvent) => void;
  handleLineWidthPick: (e: SyntheticEvent) => void;
  handleInstrumentPick: (e: SyntheticEvent) => void;
}

const ControlPanel = (props: ControlPanelProps): JSX.Element => {
  const { handleColorPick, handleLineWidthPick, handleInstrumentPick } = props;
  return (
    <ControlPanelWrapper>
      <ColorPickerContainer>
        {colors.map((value) => (
          <ColorPickerItem id={value} onClick={handleColorPick} color={value} />
        ))}
      </ColorPickerContainer>
      <InstrumentPickerContainer>
        {instruments.map((value, index) => (
          <Instrument src={value} id={index.toString()} onClick={handleInstrumentPick} />
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
};

export default ControlPanel;
