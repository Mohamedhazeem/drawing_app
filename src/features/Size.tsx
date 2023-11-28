import { useDispatch, useSelector } from "react-redux";
import Tool from "../components/Tool";
import { FaRegCircleDot } from "react-icons/fa6";
import { showSize, size } from "../state/canvas/toolsSlice";
import { useRef } from "react";
import { RootState } from "../state/store";

function Size() {
  const dispatch = useDispatch();
  const sizeInput = useRef<HTMLInputElement | null>(null);
  const isShowSize = useSelector((state: RootState) => state.tools.isShowSize);

  function OnClick() {
    if (sizeInput.current) {
      dispatch(showSize(true));
    }
  }

  function onSizeClick() {
    dispatch(size(5));
  }
  return (
    <div>
      <Tool onclick={OnClick} icon={<FaRegCircleDot size={25} />} />
      <input
        type="range"
        ref={sizeInput}
        className={`size-select ${isShowSize ? "block" : "hidden"}`}
      />
    </div>
  );
}

export default Size;
