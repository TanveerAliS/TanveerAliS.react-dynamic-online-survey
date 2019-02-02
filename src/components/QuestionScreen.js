import React from "react";
import Question from "./Question";
import Answers from "./Answers";
import NavButtons from "./NavButtons";

export default class QuestionScreen extends React.Component {
  render() {
    const {
      nextQuestion,
      prevQuestion,
      surveyData,
      quesIndexCurrent,
      quesIndexTotal,
      updateUserOptions,
      currentFieldData,
      userAnswers
    } = this.props;
    return (
      <section className="section-main">
        <Question quesIndexCurrent={quesIndexCurrent} question={surveyData} />
        <Answers
          options={surveyData}
          currentFieldData={currentFieldData}
          updateUserOptions={updateUserOptions}
          userAnswers={userAnswers}
          quesIndexCurrent={quesIndexCurrent}
        />
        <NavButtons
          nextQuestion={nextQuestion}
          prevQuestion={prevQuestion}
          quesIndexCurrent={quesIndexCurrent}
          quesIndexTotal={quesIndexTotal}
        />
      </section>
    );
  }
}
