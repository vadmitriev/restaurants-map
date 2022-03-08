import React from 'react';

import './ListItem.scss';

const ListItem = ({ item, onClick, onLinkClick }) => {
  const { name, rating, url } = item;

  const address = item.vicinity || item.formatted_address;

  return (
    <div className="wrapper" onClick={onClick}>
      <div className="content">
        <div className="list-item__name">{name}</div>
        <div className="list-item__img">{url}</div>
        <div className="list-item__address">{address}</div>
        <div className="list-item__info" onClick={onLinkClick}>
          <span className="list-item__rating">⭐ {rating}</span>
          <span className="list-item__link">Подробнее</span>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
