import React from 'react';

import './ListItem.scss';

const ListItem = ({ name, rating, onClick, onLinkClick }) => {
  return (
    <div className="wrapper" onClick={onClick}>
      <div className="content">
        <a href="# " onClick={onLinkClick}>
          Подробнее
        </a>
        {name} - {rating}
      </div>
    </div>
  );
};

export default ListItem;
