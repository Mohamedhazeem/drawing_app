import React, { ReactNode, createContext } from "react";

export const SaveCanvasContext = createContext(() => {
  undefined;
});
interface SaveCanvasProviderProps {
  children: ReactNode;
  saveCanvas: () => void;
}

function SaveCanvasProvider({ children, saveCanvas }: SaveCanvasProviderProps) {
  return (
    <SaveCanvasContext.Provider value={saveCanvas}>
      {children}
    </SaveCanvasContext.Provider>
  );
}

export default SaveCanvasProvider;
