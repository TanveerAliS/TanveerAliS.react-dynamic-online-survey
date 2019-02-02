import React from "react";

export default class ResultsScreen extends React.Component {
  render() {
    const { getResultsTable, resetSurvey } = this.props;
    return (
      <section className="section-main">
        <div className="guidelines endscreen col col-lg-6 offset-lg-3 col-md-6 offset-md-3">
          <br />
          <br />
          <br />
          <br />
          <br />
          <button className="btn btn-nav" onClick={getResultsTable}>
            <i className="fas fa-list-ul" /> View results
          </button>
          <button className="btn btn-nav" onClick={resetSurvey}>
            <i className="fas fa-redo" /> Reset Survey
          </button>
        </div>
      </section>
    );
  }
}
