import React, { useRef, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  oversLimitedTo,
  runsOnExtra,
  wicketsLimitedTo,
} from "../atoms/settingsAtom";
import { NewMatch } from "./NewMatch";
import Toggle from "./Toggle";

export const Settings = () => {
    
  const [oversLimit, setOversLimit] = useRecoilState(oversLimitedTo);
  const [wicketsLimit, setWicketsLimit] = useRecoilState(wicketsLimitedTo);

  return (
    <div className="  bg-color-main-body ">
      <div className="bg-controls-bg  opacity-35  z-10    h-[90vh] absolute w-screen"></div>
      <div className="bg-[#ffffff4e] text-black
      
      bg-gradient-to-b from-gradiant-start from-10%  via-gradiant-2 via-30% to-90% to-gradiant-end backdrop-blur-md
       md:w-[460px] flex flex-col w-screen top-16 bottom-16 left-0 right-0 absolute h-[93vh] z-20 overflow-hidden backdrop:blur-md transition duration-500 ">
        {/* title */}
        <div className="text-center text-4xl">Settings</div>
        {/* Extras Toggle */}
        <Toggle />
        {/* Overs Limit */}
        <div className="flex flex-col justify-around">
          <ChangeCount
            state={oversLimit}
            setState={setOversLimit}
            lable={"Overs Limit"}
            def={oversLimit}
            max={90}
            b1={<i className="fa-solid fa-plus"></i>}
            b2={<i className="fa-solid fa-minus"></i>}
          ></ChangeCount>

          {/* Wickets Limit */}
          <ChangeCount
            state={wicketsLimit}
            setState={setWicketsLimit}
            lable={"wickets Limit"}
            def={wicketsLimit}
            max={10}
            b1={<i className="fa-solid fa-plus"></i>}
            b2={<i className="fa-solid fa-minus"></i>}
          ></ChangeCount>
        </div>

        <NewMatch />

      </div>
    </div>
  );
};
function ChangeCount({ lable, b1, b2, max, def, state, setState }) {
  const editOvers = useRef();
  const editCount = useRef();
  const [isEdit, setisEdit] = useState(true);
  const [value, setValue] = useState(def);
  const Edit = (e) => {
    setState(value);
    setisEdit((e) => !e);
  };
  return (
   <div className="transition-all duration-700">
     {/* <div className="flex flex-col items-center relative">
      <p className="text-2xl font-semibold m-2 p-2">{lable}</p>

      <input
        ref={editOvers}
        readOnly
        className="w-20 text-center p-1  text-3xl rounded-lg "
        value={value}
        type="number"
        name="versLimit"
        id="overs"
      />

      <div className="flex absolute top-[42%] ">
        <button
          className={`
                    ${!isEdit ? "hidden" : "block "}
                    ${
                      value <= 1
                        ? "opacity-50 cursor-not-allowed"
                        : "opacity-100 cursor-pointer"
                    }
                    border px-2 mt-2 mx-1 text-2xl w-10 text-center rounded-md relative -left-10
                    `}
          disabled={value <= 1}
          onClick={() => setValue((p) => p - 1)}
        >
          {b2}
        </button>
        <button
          className={`
                    ${!isEdit ? "hidden" : "block "}
                    ${
                      value >= max
                        ? "opacity-50 cursor-not-allowed"
                        : "opacity-100 cursor-pointer"
                    }
                    border px-2 mt-2 mx-1 text-2xl w-10 text-center rounded-md relative left-10
                    `}
          disabled={value >= max}
          onClick={() => {
            setValue((p) => p + 1);
            console.log(value);
          }}
        >
          {b1}
        </button>
      </div>

      EDIT button
      <button
        className="bg-button-primary focus:bg-button-primary focus:outline-none focus:opacity-90 text-xl font-semibold p-2 mt-2 w-20 rounded-lg "
        onClick={Edit}
      >
        {!isEdit ? "Edit " : "Save"}
      </button>
    </div> */}
    <div className="flex justify-between p-5 items-center">
      <p className="text-md font-semibold">{lable}</p>
      <div className="flex items-center justify-center relative">
        <button className={`
          bg-accent p-2 h-8 w-8   rounded m-2 text-xl absolute  flex justify-center items-center transition-all duration-500
          ${isEdit?"left- -z-0 pointer-events-none":'left-[-68px]'}
          ${
            value >= max
              ? "opacity-50 cursor-not-allowed pointer-events-none"
              : "opacity-100 cursor-pointer"
          }
          `}
          onClick={() => setValue((p) => p + 1)}>{b1}</button>
        <div ref={editCount} className={` 
          bg-accent p-2 w-8 m-2 text-xl cursor-default rounded-md z-20  absolute flex justify-center items-center transition-all duration-500
          ${isEdit?'-left-16':'-left-24'}
          `}>{value}</div>
        <button className={`
          bg-accent p-1 h-8 w-6   rounded  m-1 text-xl absolute  flex justify-center items-center transition-all duration-500
          ${isEdit?"left-[-70px] pointer-events-none":'left-[-145px]'}
          ${
            value <= 1
              ? "opacity-50 cursor-not-allowed pointer-events-none"
              : "opacity-100 cursor-pointer"
          }
          `}
          onClick={() => setValue((p) => p - 1)}>{b2}</button>
        <button className="p-3 z-10 bg-dominant text-text-1 rounded-lg"
        onClick={Edit}
        >
        {!isEdit ? "Save" : "Edit."}
        </button>
      </div>
    </div>
   </div>
  );
}

export const EditCount =({ lable, b1, b2, max, def, state, setState })=> {
  const editOvers = useRef();
  const editCount = useRef();
  const [isEdit, setisEdit] = useState(true);
  const [value, setValue] = useState(def);
  const Edit = (e) => {
    setState(value);
    setisEdit((e) => !e);
  };
  return(
    <div className="flex justify-between p-5 items-center">
      <p className="text-md font-semibold">{lable}</p>
      <div className="flex items-center justify-center relative">
        <button className={`
          bg-accent p-2 h-8 w-8   rounded m-2 text-xl absolute  flex justify-center items-center transition-all duration-500
          ${isEdit?"left- -z-0 pointer-events-none":'left-[-68px]'}
          ${
            value >= max
              ? "opacity-50 cursor-not-allowed pointer-events-none"
              : "opacity-100 cursor-pointer"
          }
          `}
          onClick={() => setValue((p) => p + 1)}>{b1}</button>
        <div ref={editCount} className={` 
          bg-accent p-2 w-8 m-2 text-xl cursor-default rounded-md z-20  absolute flex justify-center items-center transition-all duration-500
          ${isEdit?'-left-16':'-left-24'}
          `}>{value}</div>
        <button className={`
          bg-accent p-1 h-8 w-6   rounded  m-1 text-xl absolute  flex justify-center items-center transition-all duration-500
          ${isEdit?"left-[-70px] pointer-events-none":'left-[-145px]'}
          ${
            value <= 1
              ? "opacity-50 cursor-not-allowed pointer-events-none"
              : "opacity-100 cursor-pointer"
          }
          `}
          onClick={() => setValue((p) => p - 1)}>{b2}</button>
        <button className="p-3 z-10 bg-dominant text-text-1 rounded-lg"
        onClick={Edit}
        >
        {!isEdit ? "Save" : "Edit."}
        </button>
      </div>
    </div>
  )
}