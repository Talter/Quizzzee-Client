import React from 'react'
import { useState } from 'react';

function Content(props) {
    const [click, setClick] = useState(true);
    const data = props.quizzzy;
    return (
      <section className="flex items-center gap-10 relative">
        <div
          onClick={() => {
            setClick(!click);
          }}
          className={
            "bg-white select-none h-96 w-1/2 translate-x-[5rem] rounded-xl shadow-lg line-clamp-5 text-3xl font-semibold flex justify-center items-center px-12 overflow-hidden z-10 " 
          }
        >
          {data.text}
        </div>
        <div
          onClick={() => {
            setClick(!click);
          }}
          className={
            "bg-mainColor select-none h-96 w-1/2 transition tranform  translate-y-[1rem] rounded-xl shadow-lg line-clamp-5 text-3xl font-semibold flex justify-center items-center px-12 overflow-hidden text-white " +
            // (click ? "translate-x-[-35rem] z-0" : "translate-x-[-5rem] z-20")
            (click ? "translate-x-[-35rem] z-0" : "translate-x-[-5rem]")
          }
        >
          {data.answer_fc}
        </div>
      </section>
    );
}

export default Content;