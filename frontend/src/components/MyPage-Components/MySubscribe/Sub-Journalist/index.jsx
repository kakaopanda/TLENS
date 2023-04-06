import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SubArticles from '../Sub-articles';
import './subJournalist.scss';


// API
import {getSubscribe} from "../../../../apis/news"

const SubJournalist = ({userInfo}) => {
  
  const [selectedJournalist, setSelectedJournalist] = useState(null);

  const [subReporter, setsubReporter] = useState([])

  useEffect(() => {
    const fetchReporterList = async () => {
      try {
        const response = await getSubscribe();
        setsubReporter(response.lst);
      } catch (error) {
        console.error(error);
      }
    };
    fetchReporterList();
  }, []);

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 1000,
    slidesToShow: subReporter.length < 5 ? subReporter.length : 5,
    slidesToScroll: 1,
    centerMode: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          centerMode: true,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 1,
          centerMode: true,
        },
      },
    ],
  };

  return (
    <div>
      <h2>"{userInfo.nickname}"님의 구독한 기자 : (총 {subReporter.length}명)</h2>
      <Slider {...settings}>
        {subReporter.map((reporter) => (
          <div key={reporter.reporterId}>
            <img
              src={reporter.thumbnail}
              alt={reporter.name}
              onClick={() => setSelectedJournalist(reporter)}
              className="reporter-image"
            />
            {/* <img
              className="press-image"
              src={reporter.press}
              alt={reporter.name}
              onClick={() => setSelectedJournalist(reporter)}
            /> */}
            <p>{reporter.name}</p>
          </div>
        ))}
      </Slider>
      <div className="journalist-info-container">
      {!selectedJournalist && (
          <div className="journalist-info">
            {subReporter.map((reporter) => (
              <SubArticles key={reporter.id} name={reporter.name} />
            ))}
          </div>
        )}
        {selectedJournalist && (
          <div className="journalist-info">
            <SubArticles key={selectedJournalist.id} name={selectedJournalist.name} />

        </div>
      )}
      </div>
    </div>
  );
};

export default SubJournalist;
