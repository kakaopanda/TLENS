import React, { useEffect, useState } from "react";
import { TiChevronLeftOutline, TiChevronRightOutline } from "react-icons/ti";
import "./ReporterCarousel.scss";
import ReporterCard from "../ReporterCard";

// MUI
import Divider from "@mui/material/Divider";

const CARDS = 16;
const MAX_VISIBILITY = 4;

const Carousel = ({ children, active, handlePrev, handleNext }) => {
  const count = React.Children.count(children);

  return (
    <>
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
    </>
  );
};

const ReporterCarousel = () => {
  const [active, setActive] = useState(3);

  const handlePrev = () => setActive((i) => i - 1);
  const handleNext = () => setActive((i) => i + 1);

  return (
    <div style={{ height: 240 }}>
      <div className="reportercarousel-main">
        <Carousel
          active={active}
          handlePrev={handlePrev}
          handleNext={handleNext}
        >
          {[...new Array(CARDS)].map((_, i) => (
            <ReporterCard key={i} index={i + 1} />
          ))}
        </Carousel>
      </div>
      <div style={{ margin: "0 8% 0 8%" }}>
        <Divider />
        {active}
      </div>
    </div>
  );
};

export default ReporterCarousel;
