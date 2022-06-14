import React from "react";

function MainImage(props) {
  return (
    <div
      id="mainImage"
      style={{
        background: `linear-gradient(to bottom, rgba(0,0,0,0)
  39%,rgba(0,0,0,0)
  41%,rgba(0,0,0,0.65)
  100%),
  url('${props.image}'), #1c1c1c`,
        height: "650px",
        backgroundSize: "100%, cover",
        backgroundPosition: "center, center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        position: "relative",
        marginBottom: "1em",
      }}
    >
      <div>
        <h2>{props.title}</h2>
        <p>{props.text}</p>
      </div>
    </div>
  );
}

export default MainImage;
