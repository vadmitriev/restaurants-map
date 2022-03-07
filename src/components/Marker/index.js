import React, { useState } from 'react';

import './Marker.scss';

const Marker = ({ item, onClick, isSeleced = false }) => {
  const [cn, setCn] = useState('pin ');

  const handleMouseEnter = () => {
    setCn('pin highlight');
  };

  const handleMouseLeave = () => {
    setCn('pin');
  };

  return (
    <div
      className={cn}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card">
        <div className="card-body">
          <strong>{item?.name}</strong>
        </div>
      </div>
    </div>
  );
};

export default Marker;
