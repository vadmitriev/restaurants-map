import React from 'react';

import './Skeleton.scss';

const Skeleton = ({ isVisible }) => {
  const cn = `skeleton ${isVisible ? '' : 'hide'} `;
  return <div className={cn} />;
};

export default Skeleton;
