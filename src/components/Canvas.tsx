import { useEffect, useRef, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { canPaint, setCanvasContext } from "../state/canvas/canvasSlice";
import { showSize } from "../state/canvas/toolsSlice";

function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContextRef = useRef<CanvasRenderingContext2D | null>(null);

  const BG = "#FFFFFF";

  const dispatch = useDispatch();
  const isPaint = useSelector((state: RootState) => state.canvas.isPainting);
  const isDraw = useSelector((state: RootState) => state.tools.isDraw);
  const isErase = useSelector((state: RootState) => state.tools.isErase);
  const size = useSelector((state: RootState) => state.tools.size);

  const canvasConext = useSelector(
    (state: RootState) => state.canvas.canvasContext
  );
  useEffect(() => {
    const Canvas = canvasRef.current;
    Canvas!.width = screen.width;
    Canvas!.height = screen.height;
    Canvas!.style.width = `${window.innerWidth}`;
    Canvas!.style.height = `${window.innerHeight}`;
    Canvas!.style.backgroundColor = BG;

    const canvasContext = Canvas!.getContext("2d");
    canvasContext!.lineCap = "round";
    canvasContext!.strokeStyle = "black";
    canvasContext!.lineWidth = size || 5;
    dispatch(setCanvasContext({ strokeStyle: "black" }));
    canvasContextRef.current = canvasContext;
  }, []);

  const startDraw = (event: MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = event.nativeEvent;

    if (isDraw) {
      canvasContextRef.current!.strokeStyle =
        canvasConext!.strokeStyle || "black";
      canvasContextRef.current!.lineWidth = size || 5;
    } else if (isErase) {
      canvasContextRef.current!.strokeStyle = BG;
      canvasContextRef.current!.lineWidth = size || 5;
    }

    canvasContextRef.current?.beginPath();
    canvasContextRef.current?.moveTo(offsetX, offsetY);
    dispatch(showSize(false));
    dispatch(canPaint(true));
  };

  const endDraw = () => {
    dispatch(canPaint(false));
  };

  const draw = (event: MouseEvent<HTMLCanvasElement>) => {
    if (!isPaint) return;
    const { offsetX, offsetY } = event.nativeEvent;

    canvasContextRef.current?.lineTo(offsetX, offsetY);
    canvasContextRef.current?.stroke();
  };
  return (
    <>
      <canvas
        ref={canvasRef}
        onMouseDown={startDraw}
        onMouseUp={endDraw}
        onMouseMove={draw}
      ></canvas>
    </>
  );
}

export default Canvas;
