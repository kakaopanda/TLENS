import React, {useState, useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";
import Dots from "../../components/User-Components/Dots"
import "./home.scss"

// MUI
import { Button } from "@mui/material";

const DIVIDER_HEIGHT = 5;

const Home = () => {  
  const navigate = useNavigate()

  const outerDivRef = useRef();
  const [scrollIndex, setScrollIndex] = useState(1);
  useEffect(() => {
    const wheelHandler = (e) => {
      e.preventDefault();
      const { deltaY } = e;
      const { scrollTop } = outerDivRef.current; // 스크롤 위쪽 끝부분 위치
      const pageHeight = window.innerHeight; // 화면 세로길이, 100vh와 같습니다.

      if (deltaY > 0) {
        // 스크롤 내릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          // 현재 1페이지
          console.log("현재 1페이지, down");
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(2);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          // 현재 2페이지
          console.log("현재 2페이지, down");
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(3);
        } else if (scrollTop >= pageHeight * 2 && scrollTop < pageHeight * 3) {
          // 현재 3페이지
          console.log("현재 3페이지, down");
          outerDivRef.current.scrollTo({
            top: pageHeight * 3 + DIVIDER_HEIGHT * 3,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(4);
        } else if (scrollTop >= pageHeight * 3 && scrollTop < pageHeight * 4) {
          // 현재 4페이지
          console.log("현재 4페이지, down");
          outerDivRef.current.scrollTo({
            top: pageHeight * 4 + DIVIDER_HEIGHT * 4,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(5);
        } else {
          // 현재 5페이지
          console.log("현재 5페이지, down");
          setScrollIndex(5);
        }
      } else {
        // 스크롤 올릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          // 현재 1페이지
          console.log("현재 1페이지, up");
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(1);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          // 현재 2페이지
          console.log("현재 2페이지, up");
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(1);
        } else if (scrollTop >= pageHeight * 2 && scrollTop < pageHeight * 3) {
          // 현재 3페이지
          console.log("현재 3페이지, up");
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(2);
        } else if (scrollTop >= pageHeight * 3 && scrollTop < pageHeight * 4) {
          // 현재 4페이지
          console.log("현재 4페이지, up");
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(3);
        } else {
          // 현재 5페이지
          console.log("현재 5페이지, up");
          outerDivRef.current.scrollTo({
            top: pageHeight * 3 + DIVIDER_HEIGHT * 3,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(4);
        }
      }
    };
    const outerDivRefCurrent = outerDivRef.current;
    outerDivRefCurrent.addEventListener("wheel", wheelHandler);
    return () => {
      outerDivRefCurrent.removeEventListener("wheel", wheelHandler);
    };
  }, []);
  return (
    <div ref={outerDivRef} className="outer">
      <Dots scrollIndex={scrollIndex} />
      <div className="first-page">
        <img src="img/Tlens.gif" alt="" style={{ height: "28vh" }} />
        <p className="description" style={{ "font-family": 'Jua, sans-serif', fontSize:"30px" }}>
          T:LENS의 자세한 이야기가 궁금하신가요? 스크롤을 내리면서 확인해보세요!!
        </p>
        <div className="enter-button">
          <Button
            style={{ "font-family": 'Jua, sans-serif'}}
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={() => navigate("/main")}
          >
            T:LENS 바로 이용해보기
          </Button>
        </div>
      </div>
      <div className="divider"></div>
      <div className="inner-page">
        <div className="page-background">
          <p style={{ "font-family": 'Jua, sans-serif', fontSize:"30px" }}>
            뉴스 트랜드 분석 및 시각화!
          </p>
        </div>
      </div>
      <div className="divider"></div>

      <div className="divider"></div>
      <div className="inner-page">
        <p className="description" style={{ "font-family": 'Jua, sans-serif', fontSize:"30px" }}>
          가치 중립적 정보 제공!
        </p>
      </div>
      <div className="divider"></div>
      <div className="inner-page">
        <p className="description" style={{ "font-family": 'Jua, sans-serif', fontSize:"30px" }}>
          기사 작성 패턴 분석!
        </p>
      </div>
      <div className="divider"></div>
      <div className="final-page">
        <p className="description" style={{ "font-family": 'Jua, sans-serif', fontSize:"30px" }}>
          트렌즈의 서비스에 관심이 생기셨나요? 지금 당장 이용해보세요
        </p>
        <div className="button-set">
          <Button
            style={{ "font-family": 'Jua, sans-serif'}}
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={() => navigate("/main")}
          >
            T:LENS 바로 이용해보기
          </Button>
          <Button
            style={{ "font-family": 'Jua, sans-serif'}}
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={() => navigate("/auth")}
          >
            로그인 / 회원가입 하기
          </Button>
        </div>
      </div>
    </div>
  );
}


export default Home