import React from "react";

export default class Question extends React.Component {
  render() {
    const { question, quesIndexCurrent } = this.props;
    return (
      <div className="guidelines question">
        <h2>
          {quesIndexCurrent + 1}.&nbsp;
          {question[1][quesIndexCurrent].question}
        </h2>
      </div>
    );
  }
}
