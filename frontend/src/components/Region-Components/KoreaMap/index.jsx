import React, { useState } from 'react';
import paths from './paths.json';
import './koreaMap.scss';

const KoreaMap = ({ onRegionSelect }) => {
  const [id, setId] = useState('');
  const [report, setReport] = useState('');
  const [cardStyle, setCardStyle] = useState(null);
	const [label, setLabel] = useState('');


  function handleRegionClick(event) {
    const id = event.target.getAttribute('name');
    const simple = event.target.getAttribute('simple');
    const report = event.target.getAttribute('report');
 
    setId(id);
    setReport(report);

    // 마우스 이벤트가 발생한 위치를 기준으로 카드를 위치시킨다
    const cardX = event.clientX + 5;
    const cardY = event.clientY + 5;
    setCardStyle({ top: cardY, left: cardX });

		const name = event.target.getAttribute('name');
    setLabel(name);

    // 콜백 함수 호출
    onRegionSelect(simple);
  }


  return (
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 524 631" className='korea-map'>
        {paths.map(path => (
          <path
            key={path.id}
            id={path.id}
            name={path.name}
            simple={path.simple}
            d={path.d}
						report={path.report}
            onClick={handleRegionClick}
            className={id === path.name ? 'selected' : ''}
          />
        ))}
      </svg>
			{cardStyle !== null && (
        <div className="card-wrapper">
          <div className="map-card" style={cardStyle}>
            <h5>{id}</h5>
            <h5>뉴스량 : {report}</h5>
            <h5>가장 많은 키워드 : </h5>
            <h5>사과({report}) </h5>
          </div>
          {label !== '' && (
            <div className="label" style={{ top: cardStyle.top - 20, left: cardStyle.left }}>
              {label}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default KoreaMap;
