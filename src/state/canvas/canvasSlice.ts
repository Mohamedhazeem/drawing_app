import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import React from "react";


interface Canvas {
  isPainting?: boolean;
  strokeStyle?: string;
  size?: number;
  width?: number;
  height?: number;
}

const initialState: Canvas = { isPainting: false,size: 5,width: window.innerWidth, height: window.innerWidth,strokeStyle:"black" };

const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    canPaint: (state, action: PayloadAction<boolean>) => {
      state.isPainting = action.payload;
    },
    setCanvasStrokeStyle: (state, action: PayloadAction<string>) => {
      state.strokeStyle = action.payload;
    },
    setSize: (state, action: PayloadAction<number>)=>{
        state.size = action.payload;
    },
    setCanvasContext: (state, action: PayloadAction<Canvas>) => {
        state.width = action.payload.width;
        state.height = action.payload.height;
    }
  },
});
export const { canPaint, setCanvasStrokeStyle,setSize } = canvasSlice.actions;

export default canvasSlice.reducer;


