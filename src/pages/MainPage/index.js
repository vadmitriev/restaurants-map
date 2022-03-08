import React, { useContext } from 'react';

import { List } from 'components';
import { Map } from 'components';

import { Context } from '../../index';

import './MainPage.scss';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const { store } = useContext(Context);
  const navigator = useNavigate();

  const handleClick = (item) => {
    console.log(item);

    store.setSelectedItem(item);
  };

  const handleLinkClick = (placeId) => {
    navigator(`/restaurants/${placeId}`);
  };

  const handleClose = () => {
    store.setSelectedItem(null);
  };

  const handleSearch = (text) => {
    store.setQuery(text);
  };

  return (
    <div className="main">
      <List onClick={handleClick} onLinkClick={handleLinkClick} onSearch={handleSearch} />
      <Map onLinkClick={handleLinkClick} onClose={handleClose} />
    </div>
  );
};

export default observer(MainPage);
