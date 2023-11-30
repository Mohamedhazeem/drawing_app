import { useContext } from "react";
import { IconContext } from "react-icons";
import { FaFileSignature } from "react-icons/fa";
import { ClearCanvasContext } from "./Canvas";

function Navbar() {
  const clear = useContext(ClearCanvasContext);
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
          className="navbar-fileinput border-2 border-gray-400 focus:outline-orange-600"
        />
      </div>

      <div className="navbar-buttons">
        <button type="button" className="navbar-button save">
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
