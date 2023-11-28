import Navbar from "./components/Navbar";
import Canvas from "./components/Canvas";
import React, { useRef } from "react";
import Toolbox from "./components/Toolbox";
function App() {
  return (
    <>
      <Navbar />
      <Canvas />
      <div className="toolbox-holder">
        <Toolbox />
      </div>
    </>
  );
}

export default App;
