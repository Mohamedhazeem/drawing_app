import { useDispatch, useSelector } from "react-redux";
import Tool from "../components/Tool";
import { FaRegCircleDot } from "react-icons/fa6";
import {
  ToolNames,
  setLastSelectToolName,
  showSize,
} from "../state/canvas/toolsSlice";
import { useEffect, useRef, useState } from "react";
import { RootState } from "../state/store";
import { setSize } from "../state/canvas/canvasSlice";

function Size() {
  const dispatch = useDispatch();
  const sizeInput = useRef<HTMLInputElement | null>(null);
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const isShowSize = useSelector((state: RootState) => state.tools.isShowSize);
  const selectedTool = useSelector(
    (state: RootState) => state.tools.lastSelectedtoolName
  );

  useEffect(() => {
    if (ToolNames.SIZE == selectedTool) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
      dispatch(showSize(false));
    }
  }, [selectedTool]);

  function OnClick(toolName: ToolNames) {
    if (sizeInput.current) {
      dispatch(showSize(true));
      dispatch(setLastSelectToolName(toolName));
    }
  }
  return (
    <div>
      <Tool
        isSelected={isSelected}
        onclick={() => OnClick(ToolNames.SIZE)}
        icon={<FaRegCircleDot size={25} />}
      />
      <input
        type="range"
        ref={sizeInput}
        onChange={(e) => dispatch(setSize(Number(e.target.value)))}
        className={`size-select ${isShowSize ? "block" : "hidden"}`}
      />
    </div>
  );
}

export default Size;
