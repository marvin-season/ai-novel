import { useDispatch } from "react-redux";
import { updateContentMD } from "@/store/slice/NoveSlice.ts";
import { useAppSelector } from "@/store";

export default function Logger() {
  const contentMD = useAppSelector((state) => state.novel.contentMD);
  const dispatch = useDispatch();
  return (
    <div>
      {contentMD}
      <button
        onClick={() => {
          dispatch(updateContentMD("contentMD"));
        }}
      >
        increment
      </button>
    </div>
  );
}
