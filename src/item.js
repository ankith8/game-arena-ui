import React from "react";

const item = (props) => {
  return (
    <div className="card">
      <div className="card-item">
        <p>{props.data.title}</p>
      </div>
      <div className="card-item">
        <p>{props.data.platform}</p>
      </div>
      <div className="card-item">
        {" "}
        <p>{props.data.score}</p>
      </div>
      <div className="card-item">
        <p>{props.data.genre}</p>
      </div>
      <div className="card-item">
        <p>{props.data.editors_choice}</p>
      </div>
      <div className="card-item">
        <p>{props.data.release_year}</p>
      </div>
    </div>
  );
};

// <p>{props.data.url}</p>

export default item;
