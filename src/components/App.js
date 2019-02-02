import React from "react";
import Main from "./Main";
import axios from "axios";

export default class App extends React.Component {
  constructor() {
    super();
    this.quizDataSrc = "https://api.myjson.com/bins/t88ac";
    this.state = {
      inPlay: false,
      resultsNeeded: false,
      title: "",
      subtitle: "",
      timeTaken: null,
      quesIndexCurrent: 0,
      quesIndexTotal: 0,
      surveyData: [],
      userAnswers: JSON.parse(localStorage.getItem("testObject")) || [],
      currentFieldData: JSON.parse(localStorage.getItem("testObject"))
        ? JSON.parse(localStorage.getItem("testObject"))[0]
        : null
    };
    this.beginPlay = this.beginPlay.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.prevQuestion = this.prevQuestion.bind(this);
    this.updateUserOptions = this.updateUserOptions.bind(this);
    this.getResultsTable = this.getResultsTable.bind(this);
    this.resetSurvey = this.resetSurvey.bind(this);
    this.removeResultsTable = this.removeResultsTable.bind(this);
  }

  getResultsTable() {
    this.setState({ resultsNeeded: true });
  }

  removeResultsTable() {
    this.setState({ resultsNeeded: false });
  }

  beginPlay() {
    this.setState({ inPlay: true });
  }

  componentDidMount() {
    this.getQuizData();
  }

  resetSurvey() {
    this.setState(
      {
        inPlay: false,
        quesIndexCurrent: 0,
        userAnswers: [],
        resultsNeeded: false
      },
      () => {
        localStorage.setItem("testObject", JSON.stringify([]));
      }
    );
  }

  nextQuestion() {
    const { quesIndexCurrent, userAnswers, currentFieldData } = this.state;
    const localStorageData = JSON.parse(localStorage.getItem("testObject"));
    const currentField =
      localStorageData && localStorageData[quesIndexCurrent + 1]
        ? localStorageData[quesIndexCurrent + 1]
        : null;
    if (
      currentFieldData &&
      parseInt(currentFieldData.id) == quesIndexCurrent &&
      currentFieldData.answer
    ) {
      const uniqueAnswers = userAnswers;
      const index = uniqueAnswers.findIndex(e => e.id === currentFieldData.id);
      index === -1
        ? uniqueAnswers.push(currentFieldData)
        : (uniqueAnswers[index] = currentFieldData);

      this.setState(
        {
          quesIndexCurrent: quesIndexCurrent + 1,
          currentFieldData: currentField,
          userAnswers: uniqueAnswers
        },
        () => {
          localStorage.setItem(
            "testObject",
            JSON.stringify(this.state.userAnswers)
          );
        }
      );
    } else {
      alert("Please select an answer!");
    }
  }

  prevQuestion() {
    const localStorageData = JSON.parse(localStorage.getItem("testObject"));
    const currentField =
      localStorageData && localStorageData[this.state.quesIndexCurrent - 1]
        ? localStorageData[this.state.quesIndexCurrent - 1]
        : null;
    this.setState({
      quesIndexCurrent: this.state.quesIndexCurrent - 1,
      currentFieldData: currentField
    });
  }

  updateUserOptions(e) {
    let selectOption = null;
    let selectValue = null;
    if (e.target.type === "select-one") {
      selectOption = e.nativeEvent.target.selectedIndex;
      selectValue = e.nativeEvent.target[selectOption].text;
    }
    const currentFieldData = {
      id: e.target.dataset.id,
      option: selectOption || e.target.dataset.option,
      answer: selectValue || e.target.dataset.ans || e.target.value,
      question: e.target.name
    };
    this.setState({
      currentFieldData
    });
  }

  getQuizData() {
    axios
      .get(this.quizDataSrc)
      .then(res => {
        this.setState({ surveyData: res.data }, () => {
          this.setState({ title: this.state.surveyData[0].title });
          this.setState({ quesIndexTotal: this.state.surveyData[1].length });
        });
      })
      .catch(error => {
        console.error(error);
      })
      .then(() => {
        console.log("Finished request");
      });
  }

  render() {
    const {
      inPlay,
      nextQuestion,
      quesIndexCurrent,
      quesIndexTotal,
      surveyData,
      resultsNeeded,
      subtitle,
      timeTaken,
      currentFieldData,
      title,
      userAnswers
    } = this.state;
    return (
      <div className="guidelines container">
        <section className="section-hud" />
        <Main
          beginPlay={this.beginPlay}
          inPlay={inPlay}
          nextQuestion={this.nextQuestion}
          prevQuestion={this.prevQuestion}
          getResultsTable={this.getResultsTable}
          removeResultsTable={this.removeResultsTable}
          quesIndexCurrent={quesIndexCurrent}
          quesIndexTotal={quesIndexTotal}
          surveyData={surveyData}
          resultsNeeded={resultsNeeded}
          resetSurvey={this.resetSurvey}
          setTimeTaken={this.setTimeTaken}
          subtitle={subtitle}
          timeTaken={timeTaken}
          title={title}
          currentFieldData={currentFieldData}
          updateUserOptions={this.updateUserOptions}
          userAnswers={userAnswers}
        />
      </div>
    );
  }
}
