import {useContext} from 'react';
import { SaveCanvasContext } from './SaveCanvasProvider';

export const useSaveCanvas = () =>{
    return useContext(SaveCanvasContext);
}