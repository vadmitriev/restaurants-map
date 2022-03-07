import React, { useContext, useEffect } from 'react';

import { List } from 'components';
import { Map } from 'components';
import { Modal } from 'components';

import { Context } from '../../index';

import './MainPage.scss';
import { observer } from 'mobx-react-lite';

const MainPage = () => {
  const { store } = useContext(Context);

  // useEffect(() => {
  //   store.loadItems();
  // }, []);

  const handleClick = (item) => {
    console.log(item);

    store.setSelectedItem(item);
    store.setModalVisible(true);
  };

  const handleCloseModal = () => {
    store.setSelectedItem(null);
    store.setModalVisible(false);
  };

  const ItemDetails = () => {
    return (
      <>
        test <br />
        {store.selectedItem?.name}
      </>
    );
  };

  return (
    <div className="main">
      <List onClick={handleClick} />
      <Map onClick={handleClick} />
      <Modal isOpen={store.modalVisible} onCloseModal={handleCloseModal} body={<ItemDetails />} />
    </div>
  );
};

export default observer(MainPage);
