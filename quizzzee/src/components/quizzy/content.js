import React from 'react'
import { useState } from 'react';

function Content() {
    const [click, setClick] = useState(true);
    return (
      <section className="flex items-center gap-10 relative">
        <div
          onClick={() => {
            setClick(!click);
          }}
          className={
            "bg-white h-96 w-1/2 translate-x-[5rem] rounded-xl shadow-lg line-clamp-5 text-3xl font-semibold flex justify-center items-center px-12 overflow-hidden z-10 " 
          }
        >
          lorem is lorem is lorem is lorem is lorem islorem islorem islorem
          islorem islorem islorem islorem islorem islorem islorem islorem
          islorem is
        </div>

        <div
          onClick={() => {
            setClick(!click);
          }}
          className={
            "bg-mainColor h-96 w-1/2 transition tranform  translate-y-[1rem] rounded-xl shadow-lg line-clamp-5 text-3xl font-semibold flex justify-center items-center px-12 overflow-hidden " +
            (click ? "translate-x-[-35rem] z-0" : "translate-x-[-5rem] z-20")
          }
        >
          lorem is lorem is lorem is lorem is lorem islorem islorem islorem
          islorem islorem islorem islorem islorem islorem islorem islorem
          islorem is
        </div>
      </section>
    );
}

export default Content;