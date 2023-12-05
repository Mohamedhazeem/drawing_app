import Canvas from "./components/Canvas";
import Toolbox from "./components/Toolbox";
function App() {
  return (
    <>
      {/* <Navbar /> */}
      <Canvas />
      <div className="toolbox-holder">
        <Toolbox />
      </div>
    </>
  );
}

export default App;
