import React, { useState } from "react";

export default function TextForm(props) {
  const handleOnClick = (event) => {
    setText(event.target.value);
  };
  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
  };
  const handleLowClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
  };
  const handleCapitalClick = () => {
    let newText = text.replace(/\b\w/g, function (m) {
      return m.toUpperCase();
    });
    setText(newText);
  };
  const handleClearClick = () => {
    setText("");
  };
  const handleCopyClick = () => {
    let newText = document.getElementById("myBox");
    navigator.clipboard.writeText(newText.value);
    newText.select();
    props.showAlert("Your text has been copied to clipboard.", "copied");
  };
  const handleExtraSpaceClick = () => {
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "));
  };

  const [text, setText] = useState("");

  return (
    <>
      <div className="container my-3">
        <h1>Enter the text to Analyse</h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            style={{
              backgroundColor: props.mode === "light" ? "white" : "#212529",
              color: props.mode === "light" ? "black" : "lightblue",
            }}
            value={text}
            onChange={handleOnClick}
            id="myBox"
            rows="7"
          ></textarea>
        </div>
        <button
          className={`btn btn-${
            props.mode === "light" ? "primary" : "dark"
          } mx-2 my-1`}
          onClick={handleUpClick}
          disabled={text.length === 0}
        >
          Convert to UPPERCASE
        </button>
        <button
          className={`btn btn-${
            props.mode === "light" ? "primary" : "dark"
          } mx-2 my-1`}
          onClick={handleLowClick}
          disabled={text.length === 0}
        >
          Convert to lowercase
        </button>
        <button
          className={`btn btn-${
            props.mode === "light" ? "primary" : "dark"
          } mx-2 my-1`}
          onClick={handleCapitalClick}
          disabled={text.length === 0}
        >
          Convert to Capitalize
        </button>
        <button
          className={`btn btn-${
            props.mode === "light" ? "primary" : "dark"
          } mx-2 my-1`}
          onClick={handleExtraSpaceClick}
          disabled={text.length === 0}
        >
          Remove Extra Spaces
        </button>
        <button
          className={`btn btn-${
            props.mode === "light" ? "primary" : "dark"
          } mx-2 my-1`}
          onClick={handleCopyClick}
          disabled={text.length === 0}
        >
          Copy Text
        </button>
        <button
          className={`btn btn-${
            props.mode === "light" ? "primary" : "dark"
          } mx-2 my-1`}
          onClick={handleClearClick}
          disabled={text.length === 0}
        >
          Clear Text
        </button>
      </div>
      <div className="container">
        <h2 className="my-3">Your Text Summary</h2>
        <p>
          {
            text.split(/\s+/).filter((e) => {
              return e.length !== 0;
            }).length
          }{" "}
          words & {text.length} Characters
        </p>
        <p>
          avg Reading time{" "}
          {(
            0.48 *
            text.split(" ").filter((e) => {
              return e.length !== 0;
            }).length
          ).toFixed(3)}{" "}
          {text.length > 1 ? "seconds" : "second"}
        </p>
      </div>
    </>
  );
}
