import { createContext, ReactNode } from "react";

export const ClearCanvasContext = createContext(() => {
  undefined;
});
interface ClearCanvasProviderProps {
  children: ReactNode;
  clearCanvas: () => void;
}

export function ClearCanvasProvider({
  children,
  clearCanvas,
}: ClearCanvasProviderProps) {
  return (
    <ClearCanvasContext.Provider value={clearCanvas}>
      {children}
    </ClearCanvasContext.Provider>
  );
}
