import { useEffect, useRef, useState } from "react";
import Tool from "../components/Tool";
import { IoColorPaletteSharp } from "react-icons/io5";
import { ToolNames, setLastSelectToolName } from "../state/canvas/toolsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";

function Color() {
  const color = useRef<HTMLInputElement | null>(null);
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const dispatch = useDispatch();
  const selectedTool = useSelector(
    (state: RootState) => state.tools.lastSelectedtoolName
  );
  useEffect(() => {
    if (ToolNames.COLOR == selectedTool) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [selectedTool]);

  const OnClick = (toolName: ToolNames) => {
    dispatch(setLastSelectToolName(toolName));
    if (color.current) {
      color.current.click();
    }
  };

  return (
    <div>
      <Tool
        isSelected={isSelected}
        onclick={() => OnClick(ToolNames.COLOR)}
        icon={<IoColorPaletteSharp size={25} />}
      />
      <input type="color" ref={color} className="color-select" />
    </div>
  );
}

export default Color;
