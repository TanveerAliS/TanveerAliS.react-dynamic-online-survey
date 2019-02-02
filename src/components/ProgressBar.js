import React from "react";

const ProgressBar = props => {
  const { quesIndexCurrent, quesIndexTotal } = props;
  const fraction = quesIndexCurrent + 1 / quesIndexTotal;
  const fractionStr = `${quesIndexCurrent + 1}/${quesIndexTotal}`;
  const getPercentage = () => {
    return Math.round(((quesIndexCurrent + 1) / quesIndexTotal) * 100);
  };
  return (
    <div className="guidelines progressbar">
      <div className="progress">
        <div
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={getPercentage()}
          className="progress-bar"
          role="progressbar"
          style={{ width: getPercentage() + "%" }}
        />
      </div>
      <small>
        {fractionStr} ({getPercentage()}%)
      </small>
    </div>
  );
};

export default ProgressBar;
