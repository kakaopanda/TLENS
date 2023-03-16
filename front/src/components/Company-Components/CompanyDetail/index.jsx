import React from "react";
import { useParams } from "react-router-dom";

const CompanyDetail = () => {
  const { name } = useParams();

  return (
    <div>
      <h2>{name}의 디테일 페이지 입니다.</h2>
    </div>
  );
};

export default CompanyDetail;
