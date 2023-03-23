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
    const report = event.target.getAttribute('report');
    setId(id);
    setReport(report);

    // 마우스 이벤트가 발생한 위치를 기준으로 카드를 위치시킨다
    const cardX = event.clientX + 10;
    const cardY = event.clientY + 10;
    setCardStyle({ top: cardY, left: cardX });

		const name = event.target.getAttribute('name');
    setLabel(name);

    // 콜백 함수 호출
    onRegionSelect(id);
  }


  return (
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 524 631" className='korea-map'>
        {paths.map(path => (
          <path
            key={path.id}
            id={path.id}
            name={path.name}
            d={path.d}
						report={path.report}
            onClick={handleRegionClick}
            className={id === path.name ? 'selected' : ''}
          />
        ))}
      </svg>
			{cardStyle !== null && (
        <div className="card-wrapper">
          <div className="card" style={cardStyle}>
            <h5>{id}</h5>
            <p>{report}</p>
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
