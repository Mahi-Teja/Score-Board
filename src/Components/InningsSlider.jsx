
import { inningsTabAtom } from "../atoms/inningsAtom";
import { useRecoilState, useRecoilValue } from "recoil";

export const InningsSlider = () => {
  const [, setInningsTab] = useRecoilState(inningsTabAtom);
  const changeTab = (t) => {
    setInningsTab((prevTab) => (prevTab = t));
  };

  return (
    <div
      className={`bg-accent transition-all duration-700 ease-in-out text-black rounded-2xl m-2  flex justify-around gap-x-4 `}
    >
      <div className="">
        <InningsButton
          handleClick={changeTab}
          tab={1}
          lable={"First Innings"}
        />
      </div>
      <div className="">
        <InningsButton
          handleClick={changeTab}
          tab={2}
          lable={"Second Innings"}
        />
      </div>
    </div>
  );
};
const InningsButton = ({ handleClick, lable, tab }) => {
  const inningsTab = useRecoilValue(inningsTabAtom);
  return (
    <button
      onClick={() => handleClick(tab)}
      className={`  w-full  rounded-2xl p-2 m-1 outline-none transition duration-300
        ${
          inningsTab == tab ? "bg-dominant shadow-[0_0_10px] text-text-1 shadow-neutral-2" : "bg-neutral-3"
        }
        `}
    >
      {lable}
    </button>
  );
};
