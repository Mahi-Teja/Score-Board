import { useRecoilState } from "recoil";
import { runsOnExtra } from "../atoms/settingsAtom";

const Toggle = () => {
  const [isExtraValue, setIsExtraValue] = useRecoilState(runsOnExtra);
  const extras = isExtraValue;

  const handleCheckboxChange = () => {
    setIsExtraValue(!extras);
  };

  return (
    <div className="flex justify-between p-2 m-2 mx-5">
      <div className="label  flex items-center text-md font-semibold">
        Runs on Extras
      </div>
      <label className="isExtraSwitch   relative  inline-flex cursor-pointer select-none  items-center">
        <input
          type="checkbox"
          name="isExtra"
          className="sr-only"
          checked={extras}
          onChange={handleCheckboxChange}
        />
        <span
          className={`slider mr-4 flex h-[26px] w-[50px] p-1 items-center rounded-full  duration-200 ${
            extras ? "bg-dominant " : "bg-neutral-1 "
          }`}
        >
          <span
            className={`dot h-[18px] w-[18px] rounded-full bg-[#fff] duration-200 ${
              extras ? "translate-x-5" : ""
            }`}
          ></span>
        </span>
      </label>
    </div>
  );
};

export default Toggle;
