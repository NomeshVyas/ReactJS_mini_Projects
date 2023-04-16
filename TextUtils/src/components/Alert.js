import React from "react";

export default function Alert(props) {
  const capitalize = (word) => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  return (
    <div style={{ height: "45px" }}>
      {props.alert && (
        <div
          className={`alert alert-${
            props.alert.massege === "Darkmode has been enabled" ? "dark" : ""
          }${
            props.alert.massege === "Lightmode has been enabled"
              ? "primary"
              : ""
          }${
            props.alert.massege === "Your text has been copied to clipboard."
              ? "success"
              : ""
          } alert-dismissible fade show`}
          role="alert"
        >
          <strong>
            {capitalize(props.alert.typ)}: {props.alert.massege}
          </strong>
        </div>
      )}
    </div>
  );
}
