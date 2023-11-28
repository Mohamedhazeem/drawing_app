import { useDispatch } from "react-redux";
import Tool from "../components/Tool";
import { FaPen } from "react-icons/fa6";
import { draw } from "../state/canvas/toolsSlice";

function Pen() {
  const dispatch = useDispatch();
  function onPenClick() {
    dispatch(draw(true));
  }
  return (
    <div>
      <Tool onclick={onPenClick} icon={<FaPen size={25} />} />
    </div>
  );
}

export default Pen;
