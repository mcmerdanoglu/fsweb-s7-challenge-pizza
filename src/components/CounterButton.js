import React, { useState } from "react";

function CounterButton() {
  const [count, setCount] = useState(0);

  const handleMinusClick = () => {
    setCount(count - 1);
  };

  const handlePlusClick = () => {
    setCount(count + 1);
  };

  return (
    <div className="counter">
      <button className="minus" onClick={handleMinusClick}>
        -
      </button>
      <div className="variant">{count}</div>
      <button className="plus" onClick={handlePlusClick}>
        +
      </button>
    </div>
  );
}

export default CounterButton;
