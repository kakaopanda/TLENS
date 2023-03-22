import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SubArticles from '../Sub-articles';
import './subJournalist.scss';

const journalists = [
  {
    id: 1,
    name: '강주형',
    photo: 'img/profile.png',
    company: '조선일보',
    description: '강주형은 조선일보의 정치부 기자로 일하고 있습니다.',
  },
  {
    id: 2,
    name: '김양재',
    photo: 'img/profile.png',
    company: '중앙일보',
    description: '김양재는 중앙일보의 경제부 기자로 일하고 있습니다.',
  },
  {
    id: 3,
    name: '문영식',
    photo: 'img/profile.png',
    company: '동아일보',
    description: '문영식은 동아일보의 사회부 기자로 일하고 있습니다.',
  },
  {
    id: 3,
    name: '박시형',
    photo: 'img/profile.png',
    company: '한겨례',
    description: '박시형은 한겨례의 연예부 기자로 일하고 있습니다.',
  },
  {
    id: 3,
    name: '배중권',
    photo: 'img/profile.png',
    company: '경향신문',
    description: '배중권은 경향신문의 환경부 기자로 일하고 있습니다.',
  },
  {
    id: 3,
    name: '이광용',
    photo: 'img/profile.png',
    company: '오마이뉴스',
    description: '이광용은 오마이뉴스의 정치부 기자로 일하고 있습니다.',
  },
];

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
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          centerMode: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: true,
        },
      },


    ],
  };

  return (
    <div>
      <h2>"강김문배박이"님의 구독한 기자 : (총 {journalists.length}명)</h2>
      <Slider {...settings}>
        {journalists.map((journalist) => (
          <div key={journalist.id}>
            <img
              src={journalist.photo}
              alt={journalist.name}
              onClick={() => setSelectedJournalist(journalist)}
              className="journalist-photo"
            />
            <p>{journalist.company} {journalist.name}</p>
          </div>
        ))}
      </Slider>
      {selectedJournalist && (
        <div className="journalist-info">
          <img src={selectedJournalist.photo} alt={selectedJournalist.name} className="journalist-photo"/>
          <h2>{selectedJournalist.company} {selectedJournalist.name}</h2>
          <p>{selectedJournalist.description}</p>
        </div>
      )}

      <SubArticles />
    </div>
  );
};

export default SubJournalist;
