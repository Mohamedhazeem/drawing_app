import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Canvas {
  isPainting?: boolean;
  strokeStyle?: string;
  size?: number;
}

const initialState: Canvas = { isPainting: false,size: 5 };

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
  },
});
export const { canPaint, setCanvasStrokeStyle,setSize } = canvasSlice.actions;

export default canvasSlice.reducer;
