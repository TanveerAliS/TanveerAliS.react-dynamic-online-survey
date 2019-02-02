import React from "react";

const Welcome = props => {
  const { beginPlay, surveyData, subtitle, title } = props;
  const getWelcomeScreen = () => {
    if (surveyData.length) {
      return (
        <div className="guidelines titlescreen col col-lg-6 offset-lg-3 col-md-6 offset-md-3">
          <br />
          <br />
          <h1>{title}</h1>
          <p>{subtitle}</p>
          <br />
          <button className="btn btn-nav" onClick={beginPlay}>
            Start <i className="fas fa-arrow-right" />
          </button>
        </div>
      );
    } else {
      return (
        <div className="guidelines titlescreen col col-lg-6 offset-lg-3 col-md-6 offset-md-3">
          <br />
          <br />
          <div className="loader">
            <div className="lds-ellipsis">
              <div />
              <div />
              <div />
              <div />
            </div>
          </div>
          <p>Loading...</p>
          <br />
        </div>
      );
    }
  };
  return (
    <section className="section-main">
      <div className="guidelines timer">&nbsp;</div>
      {getWelcomeScreen()}
    </section>
  );
};

export default Welcome;
