import React from "react";

const NavButtons = props => {
  const btnClass = "btn btn-nav col-md-6 col-sm-6 col-xs-6";
  const { nextQuestion, prevQuestion, quesIndexCurrent } = props;
  const prevArrow = <i className="fas fa-arrow-left" />;
  const prevBtn =
    quesIndexCurrent <= 0 ? (
      <button className={btnClass} disabled>
        {prevArrow} Prev
      </button>
    ) : (
      <button className={btnClass} onClick={prevQuestion}>
        {prevArrow} Prev
      </button>
    );
  const nextArrow = <i className="fas fa-arrow-right" />;
  const nextBtn = (
    <button className={btnClass} onClick={nextQuestion}>
      Next {nextArrow}
    </button>
  );
  return (
    <div className="guidelines ui col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-12 col-xs-12">
      {prevBtn}
      {nextBtn}
    </div>
  );
};

export default NavButtons;
