import React from "react";

const ReporterCard = ({ index }) => {
  return (
    <div className="reporter-card">
      <img style={{ width: "100%" }} src={`images/${index}.jpg`} alt="" />
    </div>
  );
};

export default ReporterCard;
