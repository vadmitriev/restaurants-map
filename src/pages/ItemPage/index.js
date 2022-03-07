import React from 'react';

import { useParams } from 'react-router-dom';

import './ItemPage.scss';

const ItemPage = () => {
  const { id } = useParams();
  return <div>itemPage id: {id}</div>;
};

export default ItemPage;
