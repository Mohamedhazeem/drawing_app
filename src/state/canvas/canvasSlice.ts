import {PayloadAction, createSlice} from "@reduxjs/toolkit";

interface CanvasContext{
    strokeStyle?: string;
}

interface Canvas{
    isPainting?: boolean;
    canvasContext?: CanvasContext | null;
}

const initialState: Canvas = { isPainting: false, canvasContext: null };

const canvasSlice = createSlice({
    name: "canvas",
    initialState,
    reducers: {
        canPaint: (state,action: PayloadAction<boolean>) =>{
            state.isPainting = action.payload;
        },
        setCanvasContext: (state, action: PayloadAction<CanvasContext>) =>{
            state.canvasContext = action.payload;
        },
       

    }
})
export const {canPaint,setCanvasContext} = canvasSlice.actions;

export default canvasSlice.reducer;