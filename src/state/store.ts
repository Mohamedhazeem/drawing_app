import { combineReducers, configureStore } from "@reduxjs/toolkit";
import canvas from "./canvas/canvasSlice";
import tools from "./canvas/toolsSlice";


const rootReducer = combineReducers({
    canvas,
    tools,
  });
const store= configureStore({reducer: rootReducer});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch