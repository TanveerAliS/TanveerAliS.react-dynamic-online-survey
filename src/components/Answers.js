import React, { Fragment } from "react";

const Answers = props => {
  const {
    options,
    quesIndexCurrent,
    userAnswers,
    updateUserOptions,
    currentFieldData
  } = props;
  const btnClass = "btn btn-lg btn-ans btn-nav form-control";
  let optionSet = null;
  let currentQuestion = options[1][quesIndexCurrent];
  switch (currentQuestion.type) {
    case "input":
      optionSet = (
        <input
          type="text"
          value={currentFieldData ? currentFieldData.answer : ""}
          onChange={updateUserOptions}
          className="form-control input"
          data-id={quesIndexCurrent}
          name={currentQuestion.question}
        />
      );
      break;
    case "radio":
      optionSet = Array.from(currentQuestion.options).map((option, idx) => (
        <Fragment key={idx + option}>
          <input
            type="radio"
            onChange={updateUserOptions}
            data-option={idx}
            id={option}
            data-ques={currentQuestion.question}
            data-ans={option}
            data-id={quesIndexCurrent}
            name={currentQuestion.question}
            checked={
              (currentFieldData && currentFieldData.answer == option) || false
            }
          />
          <label className={btnClass} htmlFor={option}>
            {option}
          </label>
        </Fragment>
      ));
      break;
    case "select":
      const option = Array.from(currentQuestion.options).map((option, idx) => (
        <option
          key={idx + option}
          data-option={idx}
          id={option}
          value={currentFieldData && currentFieldData.answer == option}
          value={option}
          data-ques={currentQuestion.question}
          data-ans={option}
          data-id={quesIndexCurrent}
        >
          {option}
        </option>
      ));
      optionSet = (
        <select
          value={(currentFieldData && currentFieldData.answer) || ""}
          className={btnClass}
          onChange={updateUserOptions}
          key={quesIndexCurrent}
          name={currentQuestion.question}
          data-id={quesIndexCurrent}
        >
          {option}
        </select>
      );
      break;
  }

  return (
    <div className="guidelines options col-md-6 offset-md-3">{optionSet}</div>
  );
};

export default Answers;
