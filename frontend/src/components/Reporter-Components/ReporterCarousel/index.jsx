import React, { useRef, useEffect } from "react";
import Flickity from "flickity";

const Carousel = () => {
  const flickityRef = useRef(null);

  useEffect(() => {
    if (flickityRef.current) {
      new Flickity(flickityRef.current, {
        draggable: false,
      });
    }
  }, []);

  return (
    <div className="carousel" ref={flickityRef}>
      {/* Carousel의 아이템들을 추가할 수 있습니다. */}
      {/* 예시로 이미지들을 추가해보겠습니다. */}
      <div className="carousel-cell">
        <img src="https://example.com/image1.jpg" alt="이미지1" />
      </div>
      <div className="carousel-cell">
        <img src="https://example.com/image2.jpg" alt="이미지2" />
      </div>
      <div className="carousel-cell">
        <img src="https://example.com/image3.jpg" alt="이미지3" />
      </div>
    </div>
  );
};

export default Carousel;
