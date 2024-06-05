import React from 'react'

function Tag (props){
  const name = props.name
    return(
      <div className="select-none bg-mainColor w-36 h-12 rounded-lg flex justify-center items-center text-lg text-white font-semibold transform transition hover:scale-105 active:scale-90 active:bg-mainColorBold hover:cursor-pointer">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </div>
    );
  }

export default Tag