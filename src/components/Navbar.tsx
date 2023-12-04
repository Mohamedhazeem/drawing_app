import { IconContext } from "react-icons";
import { FaFileSignature } from "react-icons/fa";
import { useClearCanvas } from "../hooks/useClearCanvas";
import { useSaveCanvas } from "../hooks/useSaveCanvas";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setFileName } from "../state/canvas/canvasSlice";

function Navbar() {
  const clear = useClearCanvas();
  const save = useSaveCanvas();

  const disptach = useDispatch();

  return (
    <div className="navbar-container">
      <div className="navbar-icon-text-container">
        <IconContext.Provider value={{ color: "black", className: "" }}>
          <div>
            <FaFileSignature size={50} />
          </div>
        </IconContext.Provider>
        <input
          type="text"
          placeholder="File Name"
          onChange={(e) => disptach(setFileName(e.target.value))}
          className="navbar-fileinput border-2 border-gray-400 focus:outline-orange-600"
        />
      </div>

      <div className="navbar-buttons">
        <button type="button" className="navbar-button save" onClick={save}>
          SAVE
        </button>
        <button type="button" className="navbar-button clear" onClick={clear}>
          CLEAR
        </button>
      </div>
    </div>
  );
}

export default Navbar;
