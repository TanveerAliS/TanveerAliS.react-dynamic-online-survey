import React from "react";

const SummaryTable = props => {
  const retrievedObject = JSON.parse(localStorage.getItem("surveyData"));
  console.log(retrievedObject);
  const trStyle = {
    textAlign: "left",
    width: "100%"
  };
  const summaryTable = retrievedObject.map((element, index) => {
    const answer = element.answer;
    const question = element.question;

    return (
      <tr key={index}>
        <td style={trStyle}>
          {index + 1}. {question}
        </td>
        <td style={trStyle}>{answer}</td>
      </tr>
    );
  });
  const blob = {
    construct(data, fileName, a) {
      const blob = new Blob([data], { type: "octet/stream" });
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };
  const element = {
    construct(o) {
      const elem = document.createElement(o.elem);
      if (o.style) elem.style = o.style;
      document.body.appendChild(elem);
      return elem;
    }
  };
  const generateHTML = () => {
    for (let i = 0; i < retrievedObject.length; i++) {
      let answer = retrievedObject[i].answer;
      let question = retrievedObject[i].question;
    }

    const style = `
        margin-left: auto; 
        margin-right: auto; 
        text-align: center; 
        width: 500px;`;
    const trStyle = `
        text-align: left; 
        width: 100%;`;
    const marksTable = `
        <h1>Summary</h1>
        <p>Online survey:</p><hr/>`;
    let answersTable =
      marksTable +
      `<table border="1px" style="${style}">
        <tr>
          <th>Question</th>
          <th>Your Answer</th>
        </tr>`;
    for (let i = 0; i < retrievedObject.length; i++) {
      let answer = retrievedObject[i].answer;
      let question = retrievedObject[i].question;
      answersTable += `<tr>
          <td>${i + 1}.&nbsp;${retrievedObject[i].question}</td>
          <td>${answer}</td>
        </tr>`;
    }
    return answersTable + "</table><br/>";
  };
  const saveToFile = {
    blobSave(returnedHTMLTags) {
      let saveData = (function() {
        return (data, fileName) => {
          blob.construct(
            data,
            fileName,
            element.construct({
              elem: "a",
              style: "display: none"
            })
          );
        };
      })();
      let data = `<html><head><title>Online survey</title>
      <style>
        * { 
          color: #FFF;
          font-family: sans-serif;
          text-align: center;
        }
        body {
          background-attachment: fixed;
          background-image: linear-gradient(to top, #19291d 0%, #495aff 100%);
          background-size: cover;
          margin: 30px;
          margin-top: 100px;
        }
        hr {
          border: 1px solid #FFFFFF2E;
          width: 500px;
        }
        table {
          border: 1px solid #0000001A;
          border-collapse: collapse; 
        }
        tr:nth-child(even) {background: #0000000A}
        td {
          border: 1px solid #0000001A;
          padding: 10px;
          text-align: left;
          width: 100%;
        }
        th {
          border: 1px solid #0000001A;
          font-size: 12px;
          height: 50px;  
        }
        </style>
        </head>
        <body>${generateHTML()}</body></html>`;
      saveData(data, "online-survey.html");
    }
  };
  const downloadSummary = () => {
    saveToFile.blobSave(`<div class="elem-div-summary-container">ksdlkd</div>`);
  };
  const getSummary = () => {
    return (
      <div className="summary-table-wrapper">
        <table>
          <tbody>
            <tr>
              <th>Question</th>
              <th>Your Answer</th>
            </tr>
            {summaryTable}
          </tbody>
        </table>
      </div>
    );
  };
  return (
    <div>
      <div className="guidelines summary-table-screen-nav col col-lg-6 offset-lg-3 col-md-6 offset-md-3">
        <button
          className="btn btn-nav col-sm-6"
          onClick={props.removeSummaryTable}
        >
          <i className="fas fa-arrow-left" /> Back
        </button>
        <button className="btn btn-nav col-sm-6" onClick={downloadSummary}>
          <i className="fas fa-file-download" /> Download
        </button>
      </div>
      <div className="guidelines summary-table-screen col col-lg-6 offset-lg-3 col-md-12">
        <br />
        <p>
          Scroll through answers below or <a href="#">download full summary</a>
        </p>
        <hr />
        {getSummary()}
      </div>
    </div>
  );
};

export default SummaryTable;
