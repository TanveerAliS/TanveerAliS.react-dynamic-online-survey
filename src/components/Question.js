import React from "react";

const Question = props => {
  const { question, quesIndexCurrent } = props;
  return (
    <div className="guidelines question">
      <h2>
        {quesIndexCurrent + 1}.&nbsp;
        {question[1][quesIndexCurrent].question}
      </h2>
    </div>
  );
};

export default Question;
