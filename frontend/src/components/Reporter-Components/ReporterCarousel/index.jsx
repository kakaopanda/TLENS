import React, { useEffect, useState } from "react";
import { TiChevronLeftOutline, TiChevronRightOutline } from "react-icons/ti";
import "./ReporterCarousel.scss";
import ReporterCard from "../ReporterCard";
import ReporterCard2 from "../ReporterCard2";
import { getPressData, getReporterData } from "../../../apis/api/axiosinstance";

// MUI
import Divider from "@mui/material/Divider";

const MAX_VISIBILITY = 4;

const Carousel = ({ children, active, handlePrev, handleNext }) => {
  const count = React.Children.count(children);

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
  const [active, setActive] = useState(3);
  const [pressData, setPressData] = useState([]);
  const [reporterData, setReporterData] = useState([]);

  const handlePrev = () => setActive((i) => i - 1);
  const handleNext = () => setActive((i) => i + 1);

  const getPress = async () => {
    const data = await getPressData();
    const sliceData = data.slice(0, 24);
    setPressData(sliceData);
  };

  useEffect(() => {
    getPress();
  }, []);

  const getReporter = async () => {
    const data = await getReporterData(active + 1);
    setReporterData(data);
  };

  useEffect(() => {
    getReporter();
  }, [active]);

  return (
    <div style={{ height: 240 }}>
      <div className="reportercarousel-main">
        <Carousel
          active={active}
          handlePrev={handlePrev}
          handleNext={handleNext}
        >
          {pressData?.map((V, i) => (
            <ReporterCard key={i} V={V} />
          ))}
        </Carousel>
      </div>
      <br />
      <Divider sx={{ margin: "0 8% 0 8%" }} />
      <h2 style={{ textAlign: "left", marginLeft: "8%" }}>
        {reporterData[1]?.press} : {reporterData?.length}명
      </h2>
      <div
        style={{
          margin: "0 8% 0 8%",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #D8D8D8",
          borderRadius: "10px",
        }}
      >
        {reporterData ? (
          reporterData.map((V, index) => {
            return (
              <ReporterCard2 key={index} V={V} pressData={pressData[active]} />
            );
          })
        ) : (
          <h2>등록된 기자가 없습니다</h2>
        )}
      </div>
    </div>
  );
};

export default ReporterCarousel;
