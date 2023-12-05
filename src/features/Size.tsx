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
  const sizeInput = useRef<HTMLInputElement | null>(null);
  const sizeInputValue = useRef<HTMLParagraphElement | null>(null);
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const dispatch = useDispatch();
  const isShowSize = useSelector((state: RootState) => state.tools.isShowSize);
  const size = useSelector((state: RootState) => state.canvas.size);
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
  const handleSizeChange = (event: string) => {
    dispatch(setSize(Number(event)));
    sizeInputValue.current!.textContent = event;
  };
  return (
    <div>
      <Tool
        isSelected={isSelected}
        onclick={() => OnClick(ToolNames.SIZE)}
        icon={<FaRegCircleDot size={25} />}
        gradient="size-gradient"
      />
      <div className="flex flex-row">
        <input
          type="range"
          ref={sizeInput}
          min={5}
          max={50}
          defaultValue={5}
          onChange={(e) => handleSizeChange(e.target.value)}
          className={`size-select ${isShowSize ? "block" : "hidden"}`}
        />
        <p
          className={`size-select-output ${isShowSize ? "block" : "hidden"}`}
          ref={sizeInputValue}
        >
          {size}
        </p>
      </div>
    </div>
  );
}

export default Size;
