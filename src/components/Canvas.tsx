import { useEffect, useRef, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { canPaint } from "../state/canvas/canvasSlice";
import {
  ToolNames,
  setLastSelectToolName,
  showSize,
} from "../state/canvas/toolsSlice";
import Navbar from "./Navbar";
import { ClearCanvasProvider } from "../hooks/ClearCanvasProvider";
import SaveCanvasProvider from "../hooks/SaveCanvasProvider";

function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContextRef = useRef<CanvasRenderingContext2D | null>(null);

  const BG = "#FFFFFF";

  const dispatch = useDispatch();
  const isPaint = useSelector((state: RootState) => state.canvas.isPainting);
  const isDraw = useSelector((state: RootState) => state.tools.isDraw);
  const isErase = useSelector((state: RootState) => state.tools.isErase);
  const size = useSelector((state: RootState) => state.canvas.size);
  const fileName = useSelector((state: RootState) => state.canvas.fileName);

  const strokeStyle = useSelector(
    (state: RootState) => state.canvas.strokeStyle
  );
  const selectedTool = useSelector(
    (state: RootState) => state.tools.lastSelectedtoolName
  );

  useEffect(() => {
    const Canvas = canvasRef.current;
    Canvas!.width = 1080 || screen.width;
    Canvas!.height = 600 || screen.height;
    Canvas!.style.backgroundColor = BG;

    const canvasContext = Canvas!.getContext("2d");
    canvasContext!.lineCap = "round";
    canvasContext!.strokeStyle = strokeStyle!;
    canvasContext!.lineWidth = size!;
    canvasContextRef.current = canvasContext;
    window.addEventListener("mouseup", () => dispatch(canPaint(false)));

    return () => {
      window.removeEventListener("mouseup", () => dispatch(canPaint(false)));
    };
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
      canvasContextRef.current!.strokeStyle = strokeStyle!;
      canvasContextRef.current!.lineWidth = size!;
    } else if (isErase) {
      canvasContextRef.current!.strokeStyle = BG;
      canvasContextRef.current!.lineWidth = size!;
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
  const save = () => {
    const url = canvasRef.current!.toDataURL("image/jpg", 0.8);
    const elementA = document.createElement("a");
    elementA.href = url;
    elementA.download = fileName!;
    elementA.click();
    document.body.removeChild(elementA);
  };
  const clearCanvas = () => {
    canvasContextRef.current?.clearRect(0, 0, screen.width, screen.height);
  };
  return (
    <>
      <ClearCanvasProvider clearCanvas={clearCanvas}>
        <SaveCanvasProvider saveCanvas={save}>
          <Navbar />
        </SaveCanvasProvider>
      </ClearCanvasProvider>
      <div className="canvas-container">
        <canvas
          ref={canvasRef}
          onMouseDown={startDraw}
          onMouseUp={endDraw}
          onMouseMove={draw}
        ></canvas>
      </div>
    </>
  );
}

export default Canvas;
