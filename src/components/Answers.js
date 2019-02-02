import React, { Fragment } from "react";

export default class Answers extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    const {
      options,
      quesIndexCurrent,
      userAnswers,
      updateUserOptions,
      currentFieldData
    } = this.props;
    // console.log(options, quesIndexCurrent, updateUserOptions, userAnswers);
    const btnClass = "btn btn-lg btn-ans btn-nav form-control";
    let optionSet = null;
    // console.log("Answers", currentFieldData)
    console.log(
      `Answers, ${
        options[1][quesIndexCurrent]
      }, ${quesIndexCurrent}, ${userAnswers[quesIndexCurrent] &&
        userAnswers[quesIndexCurrent]
          .answer} currentFieldData ${currentFieldData &&
        currentFieldData.answer}`
    );

    switch (options[1][quesIndexCurrent].type) {
      case "input":
        optionSet = (
          <input
            type="text"
            value={currentFieldData ? currentFieldData.answer : ""}
            onChange={updateUserOptions}
            className="form-control input"
            data-id={quesIndexCurrent}
            name={options[1][quesIndexCurrent].question}
          />
        );
        break;
      case "radio":
        optionSet = Array.from(options[1][quesIndexCurrent].options).map(
          (option, idx) => (
            <Fragment key={idx + option}>
              <input
                type="radio"
                onChange={updateUserOptions}
                data-option={idx}
                id={option}
                data-ques={options[1][quesIndexCurrent].question}
                data-ans={option}
                data-id={quesIndexCurrent}
                name={options[1][quesIndexCurrent].question}
                checked={
                  (currentFieldData && currentFieldData.answer == option) ||
                  false
                }
              />
              <label className={btnClass} htmlFor={option}>
                {option}
              </label>
            </Fragment>
          )
        );
        break;
      case "select":
        const option = Array.from(options[1][quesIndexCurrent].options).map(
          (option, idx) => (
            <option
              key={idx + option}
              data-option={idx}
              id={option}
              value={currentFieldData && currentFieldData.answer == option}
              value={option}
              data-ques={options[1][quesIndexCurrent].question}
              data-ans={option}
              data-id={quesIndexCurrent}
            >
              {option}
            </option>
          )
        );
        optionSet = (
          <select
            value={(currentFieldData && currentFieldData.answer) || ""}
            className={btnClass}
            onChange={updateUserOptions}
            key={quesIndexCurrent}
            name={options[1][quesIndexCurrent].question}
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
  }
}
