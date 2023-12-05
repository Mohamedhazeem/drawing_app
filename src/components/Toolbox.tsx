import Color from "../features/Color";
import Pen from "../features/Pen";
import Erase from "../features/Erase";
import Size from "../features/Size";

const Toolbox = () => {
  return (
    <div className="toolbox">
      <Pen />
      <Erase />
      <Color />
      <Size />
    </div>
  );
};

export default Toolbox;
