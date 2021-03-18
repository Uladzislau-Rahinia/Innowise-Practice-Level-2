import React, {
  SyntheticEvent, useCallback, useEffect, useLayoutEffect, useRef, useState,
} from 'react';
import Button from 'core/components/styled/Button';
import getUserData from 'redux/selectors/UserSelector';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ButtonLink from 'core/components/styled/Link';
import LINKS from 'core/utils/constants/links';
import { savePost } from 'redux/slices/PostFeedSlice';
import { PaintWrapper, StyledCanvas, ButtonWrapper } from './styles';
import ControlPanel from './components/ControlPanel';

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

  const history = useHistory();

  const dispatch = useDispatch();

  const { username, isLoggedIn, uid } = useSelector(getUserData);

  useEffect(() => {
    if (!isLoggedIn) history.push(LINKS.LOGIN);
  }, [isLoggedIn]);

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
    nativeEvent.preventDefault();
    if (nativeEvent instanceof TouchEvent) {
      const touch = nativeEvent as TouchEvent;
      const { pageX, pageY } = touch.touches[0];
      console.log(touch.touches[0]);
      setPrevPosition({
        offsetX: pageX - canvasRef.current!.offsetLeft,
        offsetY: pageY - canvasRef.current!.offsetTop,
      });
    } else {
      const { offsetX, offsetY } = nativeEvent as MouseEvent;
      setPrevPosition({ offsetX, offsetY });
    }

    loadSnapshot();
    setIsPainting(true);
  };

  const paint = (currPosition : Position) => {
    const { offsetX, offsetY } = currPosition;
    const { offsetX: x, offsetY: y } = prevPos;
    console.log(prevPos, currPosition);
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
      ctx.stroke();
    }
  };

  const handleMouseMove = ({ nativeEvent } : SyntheticEvent) => {
    if (isPainting) {
      let currPos: Position;
      if (nativeEvent instanceof TouchEvent) {
        const touch = nativeEvent as TouchEvent;
        const { pageX, pageY } = touch.touches[0];
        currPos = ({
          offsetX: pageX - canvasRef.current!.offsetLeft,
          offsetY: pageY - canvasRef.current!.offsetTop,
        });
      } else {
        const { offsetX, offsetY } = nativeEvent as MouseEvent;
        currPos = ({ offsetX, offsetY });
      }
      paint(currPos);
    }
  };

  const endPainting = () => {
    setIsPainting(false);
    setSnapshot(ctx!.getImageData(0, 0, canvasRef.current!.width, canvasRef.current!.height));
  };

  const handleClear = () => {
    if (ctx && canvasRef && canvasRef.current) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  const handleSave = async () => {
    const data = canvasRef.current?.toDataURL();
    if (data) {
      dispatch(savePost({ img: data, uid, username }));
      history.push(LINKS.HOME);
    }
  };

  const handleLineWidthPick = useCallback((e) => {
    setLineWidth((e.target as HTMLInputElement).value);
  }, []);
  const handleInstrumentPick = useCallback((e) => { setInstrument(e.currentTarget.id); }, []);
  const handleColorPick = useCallback((e) => { setColor(e.currentTarget.id); }, []);

  return (
    <PaintWrapper>
      <span>Draw here</span>
      <StyledCanvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={endPainting}
        onMouseDown={handleMouseDown}
        onMouseLeave={endPainting}
        onMouseUp={endPainting}
        id="canvas"
        width={window.outerWidth < 500 ? window.outerWidth * 0.95 : 500}
        height={window.outerWidth < 500 ? window.outerWidth * 0.95 : 500}
      />
      <ControlPanel
        pickedColor={color}
        pickedInstrument={instrument}
        handleLineWidthPick={handleLineWidthPick}
        handleColorPick={handleColorPick}
        handleInstrumentPick={handleInstrumentPick}
      />
      <ButtonWrapper>
        <ButtonLink to="/home">Go back</ButtonLink>
        <Button isDanger onClick={handleClear}>Clear canvas</Button>
        <Button onClick={handleSave}>Save your drawing</Button>
      </ButtonWrapper>
    </PaintWrapper>
  );
};

export default Paint;
