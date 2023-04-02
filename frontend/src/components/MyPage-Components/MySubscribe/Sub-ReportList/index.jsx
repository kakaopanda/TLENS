import "./sub-ReportList.scss";
import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Link from "@mui/joy/Link";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import { useNavigate } from "react-router-dom";

import reporters from "./reporters.json";


const SubReportList = ({userInfo}) => {
  const navigate = useNavigate()

  return (
    <div>
      <h4>"{userInfo.nickname}"님의 구독기자 : (총 {reporters.length} 명)</h4>
      <div style={{ maxHeight: "500px", overflowY: "scroll" }}> {/* 카드 부분 스크롤 적용 */}
        {reporters.map((V, index) => {
          let imgName;
          if (V.company === "조선일보") {
            imgName = "images/1.jpg";
          } else if (V.company === "동아일보") {
            imgName = "images/2.jpg";
          } else if (V.company === "중앙일보") {
            imgName = "images/3.jpg";
          } else if (V.company === "한국경제") {
            imgName = "images/4.jpg";
          } else if (V.company === "매일경제") {
            imgName = "images/5.jpg";
          } else if (V.company === "머니투데이") {
            imgName = "images/6.jpg";
          }

          const handlenavigate = (value) => {
            navigate(`/reporter/${value.name}`, { state: value });
          };

          return (
            <div key={index}>
              <Card
                onClick={() => {
                  handlenavigate(V);
                }}
                className="reporter-card"
                variant="outlined"
                orientation="horizontal"
                sx={{
                  marginTop: "15px",
                  width: "90%",
                  gap: 2,
                  marginInline: "3%",
                  "&:hover": {
                    boxShadow: "md",
                    borderColor: "neutral.outlinedHoverBorder",
                  },
                }}
                style={{ overflow: "hidden" }} // 카드 부분 고정 적용
              >
                <img src={V.image} loading="lazy" alt="" style={{borderRadius:"50%",width: "80px"}} />   
                <div>
                  <Typography
                    level="h5"
                    fontWeight="bold"
                    fontSize="lg"
                    id="card-description"
                    mb={0.5}
                  >
                    "{V.name}" 기자
                  </Typography>
                  <div>
                    {imgName && (
                      <img
                        src={imgName}
                        alt="company image"
                        style={{ width: "80px", height: "25px" }}
                      />
                    )}
                  </div>
                  <div>
                    {V.field}부 기자
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
    
  );
};

export default SubReportList;
