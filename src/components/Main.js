import React from "react";
import QuestionScreen from "./QuestionScreen";
import ResultsScreen from "./ResultsScreen";
import TitleScreen from "./TitleScreen";

export default class Main extends React.Component {
  render() {
    const {
      beginPlay,
      getResultsTable,
      inPlay,
      nextQuestion,
      prevQuestion,
      surveyData,
      quesIndexCurrent,
      quesIndexTotal,
      removeResultsTable,
      resultsNeeded,
      subtitle,
      title,
      resetSurvey,
      updateUserOptions,
      currentFieldData,
      userAnswers
    } = this.props;
    const getScreen = () => {
      if (resultsNeeded) {
        return (
          <ResultsTable
            surveyData={surveyData}
            userAnswers={userAnswers}
            removeResultsTable={removeResultsTable}
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
        // display results
      } else if (!inPlay) {
        return (
          <TitleScreen
            beginPlay={beginPlay}
            surveyData={surveyData}
            subtitle={subtitle}
            title={title}
          />
        );
      }
    };
    return getScreen();
  }
}
