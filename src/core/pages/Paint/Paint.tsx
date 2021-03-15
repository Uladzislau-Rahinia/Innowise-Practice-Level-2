import React, {
  SyntheticEvent, useCallback, useEffect, useLayoutEffect, useRef, useState,
} from 'react';
import Button from 'core/components/Button';
import { saveImage } from 'core/services/firebaseStorageQueries';
import { useStore } from 'react-redux';
import { PaintWrapper, StyledCanvas } from './styles';
import ControlPanel from './components/ControlPanel';
import { ButtonWrapper } from '../HomePage/styles';

interface Position {
    offsetX: number,
    offsetY: number
}

const Paint: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>();
  const [isPainting, setIsPainting] = useState<boolean>(false);
  const [prevPos, setPrevPosition] = useState<Position>({ offsetX: 0, offsetY: 0 });
  const [snapshot, setSnapshot] = useState<ImageData>();
  const [color, setColor] = useState('black');
  const [instrument, setInstrument] = useState('0');
  const [lineWidth, setLineWidth] = useState('1');

  useLayoutEffect(() => {
    if (canvasRef && canvasRef.current) {
      setCtx(canvasRef.current.getContext('2d'));
    }
  }, []);

  const loadSnapshot = useCallback(() => {
    console.log(snapshot);
    if (snapshot) { ctx?.putImageData(snapshot, 0, 0); }
  }, [snapshot]);

  const handleMouseDown = ({ nativeEvent } : SyntheticEvent) => {
    const { offsetX, offsetY } = nativeEvent as MouseEvent;
    setPrevPosition({ offsetX, offsetY });
    loadSnapshot();
    setIsPainting(true);
  };

  const paint = (currPosition : Position) => {
    const { offsetX, offsetY } = currPosition;
    const { offsetX: x, offsetY: y } = prevPos;
    if (ctx) {
      const deltaX = x - offsetX;
      const deltaY = y - offsetY;
      const radius = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      ctx.strokeStyle = color;
      ctx.lineCap = 'round';
      ctx.lineWidth = parseInt(lineWidth, 10);
      ctx.beginPath();
      switch (instrument) {
        case '0':
          ctx.moveTo(x, y);
          ctx.lineTo(offsetX, offsetY);
          setPrevPosition({ offsetX, offsetY });
          break;
        case '1':
          ctx.clearRect(0, 0, canvasRef.current!.width,
            canvasRef.current!.height);
          loadSnapshot();
          ctx.moveTo(x, y);
          ctx.lineTo(offsetX, offsetY);
          break;
        case '2':
          ctx.clearRect(0, 0, canvasRef.current!.width,
            canvasRef.current!.height);
          loadSnapshot();
          ctx.rect(
            x,
            y,
            offsetX - x,
            offsetY - y,
          );
          break;
        case '3':
          ctx.clearRect(0, 0, canvasRef.current!.width,
            canvasRef.current!.height);
          loadSnapshot();

          ctx.arc(x, y, radius, 0, Math.PI * 2);
          break;
        default:
      }
      // Visualize the line using the strokeStyle
      ctx.stroke();
    }
  };

  const handleMouseMove = ({ nativeEvent } : SyntheticEvent) => {
    if (isPainting) {
      const { offsetX, offsetY } = nativeEvent as MouseEvent;
      const currPos: Position = { offsetX, offsetY };
      paint(currPos);
    }
  };

  const endPainting = () => {
    setIsPainting(false);
    // ctx?.save();
    setSnapshot(ctx!.getImageData(0, 0, canvasRef.current!.width, canvasRef.current!.height));
  };

  const handleClear = () => {
    if (ctx && canvasRef && canvasRef.current) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      // setSnapshot(new ImageData());
    }
  };

  const handleSave = () => {
    console.log('save');
    const data = canvasRef.current?.toDataURL();
    if (data) { saveImage(data); }
  };

  return (
    <PaintWrapper>
      <span>Draw here</span>
      <StyledCanvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseLeave={endPainting}
        onMouseUp={endPainting}
        id="canvas"
        width={500}
        height={500}
      />
      <ControlPanel
        handleLineWidthPick={(e) => setLineWidth((e.target as HTMLInputElement).value)}
        handleColorPick={(e) => { setColor(e.currentTarget.id); }}
        handleInstrumentPick={(e) => { setInstrument(e.currentTarget.id); }}
      />
      <ButtonWrapper>
        <Button onClick={handleClear} text="Clear canvas" />
        <Button onClick={handleSave} text="Save your drawing" />
      </ButtonWrapper>
    </PaintWrapper>
  );
};

export default Paint;
