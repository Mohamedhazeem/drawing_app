import { useDispatch } from "react-redux";
import Tool from "../components/Tool";
import { BsEraserFill } from "react-icons/bs";
import {
  ToolNames,
  erase,
  setLastSelectToolName,
} from "../state/canvas/toolsSlice";

function Erase() {
  const dispatch = useDispatch();
  function onEraseClick(toolName: ToolNames) {
    setLastSelectToolName(toolName);
    dispatch(erase(true));
  }
  return (
    <div>
      <Tool
        onclick={() => onEraseClick}
        toolName={ToolNames.ERASE}
        icon={<BsEraserFill size={25} />}
      />
    </div>
  );
}

export default Erase;
