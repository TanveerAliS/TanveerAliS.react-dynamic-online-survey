import React from "react";
import Question from "./Question";
import ProgressBar from "./ProgressBar";
import Answers from "./Answers";
import NavButtons from "./NavButtons";

const QuestionScreen = props => {
  const {
    nextQuestion,
    prevQuestion,
    surveyData,
    quesIndexCurrent,
    quesIndexTotal,
    updateUserOptions,
    currentFieldData,
    userAnswers
  } = props;
  return (
    <section className="section-main">
      <Question quesIndexCurrent={quesIndexCurrent} question={surveyData} />
      <ProgressBar
        quesIndexCurrent={quesIndexCurrent}
        quesIndexTotal={quesIndexTotal}
      />
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
};

export default QuestionScreen;
