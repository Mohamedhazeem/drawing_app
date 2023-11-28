import { ReactNode, useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { ToolNames } from "../state/canvas/toolsSlice";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

export interface Tools {
  icon?: ReactNode;
  toolName?: ToolNames;
  onclick?: () => void;
}

const Tool = ({ icon, onclick, toolName }: Tools) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  return (
    <IconContext.Provider
      value={{
        color: `${isSelected ? "white" : "black"}`,
        className: `${isSelected ? "black" : "white"}`,
      }}
    >
      <div className="tool" onClick={onclick}>
        {icon}
      </div>
    </IconContext.Provider>
  );
};

export default Tool;
