import { useEffect, useRef } from "react";
import Tool from "../components/Tool";
import { IoColorPaletteSharp } from "react-icons/io5";
import { ToolNames, setLastSelectToolName } from "../state/canvas/toolsSlice";

function Color() {
  const color = useRef<HTMLInputElement | null>(null);
  const OnClick = (toolName: ToolNames) => {
    setLastSelectToolName(toolName);
    if (color.current) {
      color.current.click();
    }
  };

  return (
    <div>
      <Tool
        toolName={ToolNames.COLOR}
        onclick={() => OnClick(ToolNames.COLOR)}
        icon={<IoColorPaletteSharp size={25} />}
      />
      <input type="color" ref={color} className="color-select" />
    </div>
  );
}

export default Color;
