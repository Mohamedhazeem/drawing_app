import { useDispatch, useSelector } from "react-redux";
import Tool from "../components/Tool";
import { FaPen } from "react-icons/fa6";
import {
  ToolNames,
  draw,
  setLastSelectToolName,
} from "../state/canvas/toolsSlice";
import { RootState } from "../state/store";
import { useEffect, useState } from "react";

function Pen() {
  const dispatch = useDispatch();
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const selectedTool = useSelector(
    (state: RootState) => state.tools.lastSelectedtoolName
  );
  useEffect(() => {
    if (ToolNames.PEN == selectedTool) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [selectedTool]);
  function onClick(toolName: ToolNames) {
    dispatch(draw(true));
    dispatch(setLastSelectToolName(toolName));
  }
  return (
    <div>
      <Tool
        onclick={() => onClick(ToolNames.PEN)}
        isSelected={isSelected}
        icon={<FaPen size={25} />}
      />
    </div>
  );
}

export default Pen;
