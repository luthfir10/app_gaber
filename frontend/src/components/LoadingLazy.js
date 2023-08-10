import React from "react";
import { Spinner } from "react-bootstrap";

const LoadingLazy = () => {
  return (
    <div
      style={{
        backgroundColor: "rgba(0, 0, 0, .5)",
        position: "absolute",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
        textAlign: "center",
      }}
    >
      <div
        style={{ margin: "0", position: "absolute", top: "50%", left: "50%" }}
      >
        <Spinner
          animation="grow"
          role="status"
          variant="secondary"
          style={{ width: "5rem", height: "5rem" }}
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    </div>
  );
};

export default LoadingLazy;
