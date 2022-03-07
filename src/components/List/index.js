import React, { useContext } from 'react';

import { observer } from 'mobx-react-lite';

import { useNavigate } from 'react-router-dom';

import { Context } from '../..';

import { ListItem } from 'components';
import { Input } from 'components';

import './List.scss';

const List = () => {
  const { store } = useContext(Context);

  const navigator = useNavigate();

  const onSubmit = (value) => {
    console.log(value);
  };

  const handleClick = (e) => {
    console.log(e);
  };

  const handleLinkClick = (e) => {
    navigator(`/restaurants/${e}`);
  };

  return (
    <div className="list-wrapper">
      <Input onSubmit={onSubmit} />
      <div className="list">
        {store.items.map((item) => (
          <ListItem
            key={item.place_id}
            name={item.name}
            rating={item.rating}
            onClick={() => handleClick(item.place_id)}
            onLinkClick={() => handleLinkClick(item.place_id)}
          />
        ))}
      </div>
    </div>
  );
};

export default observer(List);
