import { useEffect, useRef, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { canPaint, setCanvasStrokeStyle } from "../state/canvas/canvasSlice";
import {
  ToolNames,
  setLastSelectToolName,
  showSize,
} from "../state/canvas/toolsSlice";
import React from "react";
import Navbar from "./Navbar";
import { ClearCanvasProvider } from "../hooks/ClearCanvasProvider";

export const ClearCanvasContext = React.createContext(() => {
  undefined;
});

function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContextRef = useRef<CanvasRenderingContext2D | null>(null);

  const BG = "#FFFFFF";

  const dispatch = useDispatch();
  const isPaint = useSelector((state: RootState) => state.canvas.isPainting);
  const isDraw = useSelector((state: RootState) => state.tools.isDraw);
  const isErase = useSelector((state: RootState) => state.tools.isErase);
  const size = useSelector((state: RootState) => state.canvas.size);

  const strokeStyle = useSelector(
    (state: RootState) => state.canvas.strokeStyle
  );
  const selectedTool = useSelector(
    (state: RootState) => state.tools.lastSelectedtoolName
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
    canvasContext!.lineWidth = size!;
    dispatch(setCanvasStrokeStyle("black"));
    canvasContextRef.current = canvasContext;
  }, []);

  const startDraw = (event: MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = event.nativeEvent;

    if (selectedTool == ToolNames.COLOR || ToolNames.SIZE) {
      if (isDraw) {
        dispatch(setLastSelectToolName(ToolNames.PEN));
      } else if (isErase) {
        dispatch(setLastSelectToolName(ToolNames.ERASE));
      }
    }

    if (isDraw) {
      canvasContextRef.current!.strokeStyle = strokeStyle || "black";
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
  const clearCanvas = () => {
    canvasContextRef.current?.clearRect(0, 0, screen.width, screen.height);
  };
  return (
    <>
      <ClearCanvasProvider clearCanvas={clearCanvas}>
        <Navbar />
      </ClearCanvasProvider>
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
