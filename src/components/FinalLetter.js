import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";

function FinalLetter({letter, id }) {

  return (
    <div className="letter" id = {id}>
      {letter}
    </div>
  );
}

export default FinalLetter;
