import { useContext } from "react";
import { ClearCanvasContext } from "./ClearCanvasProvider";

export function useClearCanvas() {
  return useContext(ClearCanvasContext);
}
