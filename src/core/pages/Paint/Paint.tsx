import React, {
  SyntheticEvent, useLayoutEffect, useRef, useState,
} from 'react';
import Button from 'core/components/Button';
import { saveImage } from 'core/services/firebaseStorageQueries';
import { PaintWrapper, StyledCanvas } from './styles';

interface Position {
    offsetX: number,
    offsetY: number
}

const Paint: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>();
  const [isPainting, setIsPainting] = useState(false);
  const [prevPosition, setPrevPosition] = useState({ offsetX: 0, offsetY: 0 });

  useLayoutEffect(() => {
    if (canvasRef && canvasRef.current) {
      setCtx(canvasRef.current.getContext('2d'));
    }
  }, []);

  const handleMouseDown = ({ nativeEvent } : SyntheticEvent) => {
    const { offsetX, offsetY } = nativeEvent as MouseEvent;
    setPrevPosition({ offsetX, offsetY });
    setIsPainting(true);
  };

  const paint = (prevPos : Position, currPos : Position, strokeStyle:string) => {
    const { offsetX, offsetY } = currPos;
    const { offsetX: x, offsetY: y } = prevPos;
    if (ctx) {
      ctx.beginPath();
      ctx.strokeStyle = strokeStyle;
      // Move the the prevPosition of the mouse
      ctx.moveTo(x, y);
      // Draw a line to the current position of the mouse
      ctx.lineTo(offsetX, offsetY);
      // Visualize the line using the strokeStyle
      ctx.stroke();
    }
    setPrevPosition({ offsetX, offsetY });
  };

  const handleMouseMove = ({ nativeEvent } : SyntheticEvent) => {
    if (isPainting) {
      const { offsetX, offsetY } = nativeEvent as MouseEvent;
      const offSetData : Position = { offsetX, offsetY };
      paint(prevPosition, offSetData, '#FF0000');
    }
  };

  const endPainting = () => {
    setIsPainting(false);
  };

  const handleClear = () => {
    if (ctx && canvasRef && canvasRef.current) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  const handleSave = () => {
    console.log('save');
    const dataURL = canvasRef.current?.toDataURL();
    if (dataURL) { saveImage(dataURL); }
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
      <Button onClick={handleClear} text="Clear canvas" />
      <Button onClick={handleSave} text="Save your drawing" />
    </PaintWrapper>
  );
};

export default Paint;
