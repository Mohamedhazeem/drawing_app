import { ReactNode } from "react";
import { IconContext } from "react-icons";

export interface Tools {
  icon?: ReactNode;
  isSelected?: boolean;
  onclick?: () => void;
}

const Tool = ({ icon, onclick, isSelected }: Tools) => {
  return (
    <IconContext.Provider
      value={{
        color: `${isSelected ? "white" : "black"}`,
        className: "",
      }}
    >
      <div
        className={`${isSelected ? "tool-enabled" : "tool-disabled"} tool`}
        onClick={onclick}
      >
        {icon}
      </div>
    </IconContext.Provider>
  );
};

export default Tool;
