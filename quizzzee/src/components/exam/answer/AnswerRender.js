import React from "react";
import EassayType from "./EassayType";
import TrueFalseType from "./TrueFalseType";

function AnswerRender(props) {
  switch (props.mode) {
    case 1:
      return <EassayType {...props} />;
    case 2:
      return <TrueFalseType {...props} />;
    default:
      console.error(`Unsupported mode: ${props.mode}`);
      return null;
  }
}


export default AnswerRender;
