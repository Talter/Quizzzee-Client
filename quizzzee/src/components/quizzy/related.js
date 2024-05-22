import React from 'react'

function Related() {
    return(
        <div className=" rounded-xl  bg-subColor shadow-inner grid grid-rows-2 transition transform hover:scale-105">
          <div className="min-h-36 text-xl text-white text-center flex items-center justify-center">
            Quizzzy name
          </div>
          <div className="min-h-36 bg-white border-extraColor border rounded-xl text-black px-4 py-2">
            <div>Description: ABC</div>
            <div>Author: ABC</div>
            <div className="mt-12 text-gray-400">Last update: ABC</div>
          </div>
        </div>
      )
}

export default Related;