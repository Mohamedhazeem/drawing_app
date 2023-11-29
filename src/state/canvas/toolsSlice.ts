import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface Tools{
    isDraw: boolean;
    isErase?: boolean;
    isShowSize?: boolean;
    lastSelectedtoolName?: ToolNames;
}

export const enum ToolNames{
    PEN,
    ERASE,
    COLOR,
    SIZE
}
const initialState:Tools = {isDraw:true,isErase:false, isShowSize:false, lastSelectedtoolName: ToolNames.PEN}

const toolsSlice = createSlice({
    name: 'tools',
    initialState: initialState,
    reducers:{
        draw: (state, action: PayloadAction<boolean>)=>{
            state.isDraw = action.payload;
            state.isErase = !action.payload;
        },
        erase: (state, action: PayloadAction<boolean>) =>{
            state.isDraw = !action.payload;
            state.isErase = action.payload;
        },

        showSize: (state, action: PayloadAction<boolean>) =>{
            state.isShowSize = action.payload;
        },
        setLastSelectToolName: (state, action: PayloadAction<ToolNames>) =>{
            state.lastSelectedtoolName= action.payload;
        }
    }
})
export const {draw,erase,showSize,setLastSelectToolName} = toolsSlice.actions;
export default toolsSlice.reducer;