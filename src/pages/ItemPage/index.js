import React, { useContext, useEffect, useState } from 'react';

import { observer } from 'mobx-react-lite';

import { useNavigate } from 'react-router-dom';

import { Context } from '../../';

import { Modal } from 'components';

import './ItemPage.scss';

const ItemPage = () => {
  const { store } = useContext(Context);

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedPicture, setSelectedPicture] = useState(null);

  const navigator = useNavigate();

  const item = store.selectedItem;

  const handleMain = () => {
    store.setSelectedItem(null);
    navigator('/');
  };

  useEffect(() => {
    if (!item) {
      return;
    }

    const service = new window.google.maps.places.PlacesService(store.map);
    const request = {
      placeId: item.place_id
    };

    service.getDetails(request, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        console.log(place);

        store.setSelectedItem(place);
      }
    });
  }, [store, item]);

  if (!item) {
    return (
      <div className="empty-wrapper">
        <div className="empty">Нет данных</div>
        <button className="btn-home" onClick={handleMain}>
          На главную
        </button>
      </div>
    );
  }

  const handlePhotoClick = (url) => {
    setModalVisible(true);

    const picture = (
      <div className="img-wrapper">
        <img src={url} alt={url} />
      </div>
    );
    setSelectedPicture(picture);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const ImageCard = ({ url, onClick, alt = 'image' }) => {
    return (
      <div className="image-card" onClick={onClick}>
        <img src={url} alt={alt} />
      </div>
    );
  };

  return (
    <div className="item-page">
      <div className="name">{item.name}</div>
      <div className="item-page__wrapper">
        <div className="photos-wrapper">
          {item.photos &&
            item.photos.map((photo, idx) => {
              if (idx >= 9) return null;
              return (
                <ImageCard
                  onClick={() => handlePhotoClick(photo.getUrl())}
                  key={item.place_id}
                  url={photo.getUrl()}
                  alt={photo.html_attributions[0]}
                />
              );
            })}
        </div>
        <div className="info-wrapper">
          <div className="site">
            <a href={item.website} target="_blank" rel="noreferrer">
              {item.website}
            </a>
          </div>
          <div className="phone">
            <a href={`tel:${item.international_phone_number}`}>{item.international_phone_number}</a>
          </div>
          <div className="rating">⭐ {item.rating}</div>

          <div className="address">{item.formatted_address}</div>
          <div className="hours">
            <ul>
              {item.opening_hours?.weekday_text &&
                item.opening_hours.weekday_text.map((day) => <li key={day}>{day}</li>)}
            </ul>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalVisible} onCloseModal={handleCloseModal} body={selectedPicture} />
    </div>
  );
};

export default observer(ItemPage);
