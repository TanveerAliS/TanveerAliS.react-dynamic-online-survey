import React from "react";
import SummaryTable from "./SummaryTable";
import SummaryScreen from "./SummaryScreen";
import QuestionScreen from "./QuestionScreen";
import Welcome from "./Welcome";

const Main = props => {
  const {
    beginPlay,
    getSummaryTable,
    inPlay,
    nextQuestion,
    prevQuestion,
    surveyData,
    quesIndexCurrent,
    quesIndexTotal,
    removeSummaryTable,
    summaryNeeded,
    subtitle,
    title,
    resetSurvey,
    updateUserOptions,
    currentFieldData,
    userAnswers
  } = props;
  const getScreen = () => {
    if (summaryNeeded) {
      return (
        <SummaryTable
          surveyData={surveyData}
          userAnswers={userAnswers}
          removeSummaryTable={removeSummaryTable}
        />
      );
    }
    if (inPlay && quesIndexCurrent + 1 <= quesIndexTotal) {
      return (
        <QuestionScreen
          nextQuestion={nextQuestion}
          prevQuestion={prevQuestion}
          currentFieldData={currentFieldData}
          quesIndexCurrent={quesIndexCurrent}
          quesIndexTotal={quesIndexTotal}
          surveyData={surveyData}
          userAnswers={userAnswers}
          updateUserOptions={updateUserOptions}
        />
      );
    } else if (inPlay && quesIndexCurrent + 1 >= quesIndexTotal) {
      return (
        <SummaryScreen
          getSummaryTable={getSummaryTable}
          nextQuestion={nextQuestion}
          prevQuestion={prevQuestion}
          quesIndexCurrent={quesIndexCurrent}
          quesIndexTotal={quesIndexTotal}
          surveyData={surveyData}
          userAnswers={userAnswers}
          resetSurvey={resetSurvey}
          updateUserOptions={updateUserOptions}
        />
      );
    } else if (!inPlay) {
      return (
        <Welcome
          beginPlay={beginPlay}
          surveyData={surveyData}
          subtitle={subtitle}
          title={title}
        />
      );
    }
  };
  return getScreen();
};

export default Main;
