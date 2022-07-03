import React from "react";
import "../App.css";

function Square({ value, selectedSquare }) {
  return (
    <div className="square" onClick={selectedSquare}>
      {value}
    </div>
  );
}

export default Square;
