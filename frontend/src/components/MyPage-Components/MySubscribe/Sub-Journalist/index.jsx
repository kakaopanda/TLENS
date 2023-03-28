import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SubArticles from '../Sub-articles';
import './subJournalist.scss';

import reporters from "./reporters.json";

const SubJournalist = () => {
  const [selectedJournalist, setSelectedJournalist] = useState(null);

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
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
      <h2>"강김문배박이"님의 구독한 기자 : (총 {reporters.length}명)</h2>
      <Slider {...settings}>
        {reporters.map((reporter) => (
          <div key={reporter.id}>
            <img
              src={reporter.image}
              alt={reporter.name}
              onClick={() => setSelectedJournalist(reporter)}
              className="reporter-image"
            />
            <p>{reporter.company} {reporter.name}</p>
          </div>
        ))}
      </Slider>
      {!selectedJournalist && (
        <div className="journalist-info">
          {reporters.map((reporter) => (
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
  );
};

export default SubJournalist;
