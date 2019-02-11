import React from "react";
import Audio from "./Audio";
import Main from "./Main";
import axios from "axios";

export default class App extends React.Component {
  constructor() {
    super();
    this.surveyDataSrc = "https://api.myjson.com/bins/e6xhc";
    this.state = {
      inPlay: false,
      summaryNeeded: false,
      title: "",
      subtitle: "",
      quesIndexCurrent: 0,
      quesIndexTotal: 0,
      surveyData: [],
      userAnswers: JSON.parse(localStorage.getItem("surveyData")) || [],
      currentFieldData: JSON.parse(localStorage.getItem("surveyData"))
        ? JSON.parse(localStorage.getItem("surveyData"))[0]
        : null
    };
    this.beginPlay = this.beginPlay.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.prevQuestion = this.prevQuestion.bind(this);
    this.updateUserOptions = this.updateUserOptions.bind(this);
    this.getSummaryTable = this.getSummaryTable.bind(this);
    this.resetSurvey = this.resetSurvey.bind(this);
    this.removeSummaryTable = this.removeSummaryTable.bind(this);
  }

  getSummaryTable() {
    this.setState({ summaryNeeded: true });
  }

  removeSummaryTable() {
    this.setState({ summaryNeeded: false });
  }

  beginPlay() {
    this.setState({ inPlay: true });
  }

  componentDidMount() {
    this.getSurveyData();
  }

  resetSurvey() {
    this.setState(
      {
        inPlay: false,
        quesIndexCurrent: 0,
        userAnswers: [],
        summaryNeeded: false
      },
      () => {
        localStorage.setItem("surveyData", JSON.stringify([]));
      }
    );
  }

  nextQuestion() {
    const { quesIndexCurrent, userAnswers, currentFieldData } = this.state;
    const localStorageData = JSON.parse(localStorage.getItem("surveyData"));
    const currentField =
      localStorageData && localStorageData[quesIndexCurrent + 1]
        ? localStorageData[quesIndexCurrent + 1]
        : null;
    if (
      currentFieldData &&
      parseInt(currentFieldData.id) == quesIndexCurrent &&
      currentFieldData.answer
    ) {
      const clickSound = document.getElementById("click");
      clickSound.volume = 0.1;
      clickSound.play();
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
            "surveyData",
            JSON.stringify(this.state.userAnswers)
          );
        }
      );
    } else {
      alert("Please select an answer!");
    }
  }

  prevQuestion() {
    const localStorageData = JSON.parse(localStorage.getItem("surveyData"));
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

  getSurveyData() {
    axios
      .get(this.surveyDataSrc)
      .then(res => {
        this.setState({ surveyData: res.data }, () => {
          this.setState({
            title: this.state.surveyData[0].title,
            subtitle: this.state.surveyData[0].subtitle,
            quesIndexTotal: this.state.surveyData[1].length
          });
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
      summaryNeeded,
      subtitle,
      currentFieldData,
      title,
      userAnswers
    } = this.state;
    return (
      <div className="guidelines container">
        <section className="section-hud" />
        <Audio />
        <Main
          beginPlay={this.beginPlay}
          inPlay={inPlay}
          nextQuestion={this.nextQuestion}
          prevQuestion={this.prevQuestion}
          getSummaryTable={this.getSummaryTable}
          removeSummaryTable={this.removeSummaryTable}
          quesIndexCurrent={quesIndexCurrent}
          quesIndexTotal={quesIndexTotal}
          surveyData={surveyData}
          summaryNeeded={summaryNeeded}
          resetSurvey={this.resetSurvey}
          subtitle={subtitle}
          title={title}
          currentFieldData={currentFieldData}
          updateUserOptions={this.updateUserOptions}
          userAnswers={userAnswers}
        />
      </div>
    );
  }
}
