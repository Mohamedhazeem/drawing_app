import { useEffect, useRef, useState, MouseEvent } from "react";
import Navbar from "./components/Navbar";
function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContextRef = useRef<CanvasRenderingContext2D | null>(null);

  const [isPainting, setIsPainting] = useState(false);

  useEffect(() => {
    const Canvas = canvasRef.current;
    Canvas!.width = screen.width;
    Canvas!.height = screen.height;
    Canvas!.style.width = `${window.innerWidth}`;
    Canvas!.style.height = `${window.innerHeight}`;
    Canvas!.style.backgroundColor = "rgb(255,0,0)";

    const canvasContext = Canvas!.getContext("2d");
    canvasContext!.lineCap = "round";
    canvasContext!.strokeStyle = "black";
    canvasContext!.lineWidth = 5;
    canvasContextRef.current = canvasContext;
  }, []);

  const startDraw = (event: MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = event.nativeEvent;

    console.log(`start ${offsetX} and ${offsetY} `);
    canvasContextRef.current?.beginPath();
    canvasContextRef.current?.moveTo(offsetX, offsetY);
    setIsPainting(true);
  };

  const endDraw = () => {
    console.log("endDraw");
    setIsPainting(false);
  };

  const draw = (event: MouseEvent<HTMLCanvasElement>) => {
    if (!isPainting) return;
    const { offsetX, offsetY } = event.nativeEvent;
    console.log(`drawing ${offsetX} and ${offsetY} `);
    canvasContextRef.current?.lineTo(offsetX, offsetY);
    canvasContextRef.current?.stroke();
  };
  return (
    <>
      <Navbar />

      <canvas
        ref={canvasRef}
        onMouseDown={startDraw}
        onMouseUp={endDraw}
        onMouseMove={draw}
      ></canvas>
    </>
  );
}

export default App;
