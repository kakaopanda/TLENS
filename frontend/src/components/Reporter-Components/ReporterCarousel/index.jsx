import React, { useState } from "react";
import { TiChevronLeftOutline, TiChevronRightOutline } from "react-icons/ti";
import "./ReporterCarousel.scss";

// MUI
import Divider from "@mui/material/Divider";

const CARDS = 12;
const MAX_VISIBILITY = 3;

const Card = ({ index }) => (
  <div className="card">
    <img style={{ width: "100%" }} src={`images/${index}.jpg`} alt="" />
  </div>
);

const Carousel = ({ children }) => {
  const [active, setActive] = useState(2);
  const count = React.Children.count(children);

  const handlePrev = () => setActive((i) => i - 1);
  const handleNext = () => setActive((i) => i + 1);

  return (
    <div className="carousel">
      {active > 0 && (
        <button className="nav left" onClick={handlePrev}>
          <TiChevronLeftOutline />
        </button>
      )}
      {React.Children.map(children, (child, i) => (
        <div
          className="card-container"
          style={{
            "--active": i === active ? 1 : 0,
            "--offset": (active - i) / 3,
            "--direction": Math.sign(active - i),
            "--abs-offset": Math.abs(active - i) / 3,
            pointerEvents: active === i ? "auto" : "none",
            opacity: Math.abs(active - i) >= MAX_VISIBILITY ? "0" : "1",
            display: Math.abs(active - i) > MAX_VISIBILITY ? "none" : "block",
          }}
        >
          {child}
        </div>
      ))}
      {active < count - 1 && (
        <button className="nav right" onClick={handleNext}>
          <TiChevronRightOutline />
        </button>
      )}
    </div>
  );
};

const ReporterCarousel = () => {
  const [name, setName] = useState("");

  const handleName = () => {
    console.log("1");
  };
  return (
    <div style={{ height: 240 }}>
      <div className="reportercarousel-main">
        <Carousel>
          {[...new Array(CARDS)].map((_, i) => (
            <Card key={i} index={i + 1} />
          ))}
        </Carousel>
      </div>
      <Divider />
      <h1>hi</h1>
    </div>
  );
};

export default ReporterCarousel;
