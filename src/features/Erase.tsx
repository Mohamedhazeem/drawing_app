import { useDispatch, useSelector } from "react-redux";
import Tool from "../components/Tool";
import { BsEraserFill } from "react-icons/bs";
import {
  ToolNames,
  erase,
  setLastSelectToolName,
} from "../state/canvas/toolsSlice";
import { useEffect, useState } from "react";
import { RootState } from "../state/store";

function Erase() {
  const dispatch = useDispatch();

  const [isSelected, setIsSelected] = useState<boolean>(false);
  const selectedTool = useSelector(
    (state: RootState) => state.tools.lastSelectedtoolName
  );
  useEffect(() => {
    if (ToolNames.ERASE == selectedTool) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [selectedTool]);

  function onEraseClick(toolName: ToolNames) {
    dispatch(setLastSelectToolName(toolName));
    dispatch(erase(true));
  }
  return (
    <div>
      <Tool
        onclick={() => onEraseClick(ToolNames.ERASE)}
        isSelected={isSelected}
        icon={<BsEraserFill size={25} />}
      />
    </div>
  );
}

export default Erase;
