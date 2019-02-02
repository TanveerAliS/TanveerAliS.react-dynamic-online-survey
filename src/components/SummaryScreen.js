import React from "react";

const SummaryScreen = props => {
  const { getSummaryTable, resetSurvey } = props;
  return (
    <section className="section-main">
      <div className="guidelines endscreen col col-lg-6 offset-lg-3 col-md-6 offset-md-3">
        <br />
        <br />
        <br />
        <br />
        <br />
        <button className="btn btn-nav" onClick={getSummaryTable}>
          <i className="fas fa-list-ul" /> View Summary
        </button>
        <button className="btn btn-nav" onClick={resetSurvey}>
          <i className="fas fa-redo" /> Reset Survey
        </button>
      </div>
    </section>
  );
};

export default SummaryScreen;
