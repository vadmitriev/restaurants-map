import React, { useCallback, useContext, useEffect, useState } from 'react';

import { observer } from 'mobx-react-lite';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { Context } from '../../';

import compass from 'assets/compass.svg';

import { Spinner } from 'components';
import './Map.scss';

const libraries = ['places'];
const requestTypes = ['cafe', 'restaurant', 'food'];

const Map = ({ onLinkClick, onClose }) => {
  const { store } = useContext(Context);

  const { query, placeId, currentPosition } = store;

  const [map, setMap] = useState(null);

  let center = {
    lat: currentPosition.lat,
    lng: currentPosition.lng
  };

  const searchByQuery = useCallback(
    (map, query) => {
      const service = new window.google.maps.places.PlacesService(map);
      store.resetItems([]);

      const request = {
        location: map.center,
        radius: '2000',
        types: requestTypes,
        pageToken: store.page,
        query
      };

      service.textSearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          store.setItems(results);
        }
      });
    },
    [store]
  );

  const getDetails = useCallback(
    (placeId) => {
      const service = new window.google.maps.places.PlacesService(map);
      store.setSelectedItem(null);

      const request = {
        placeId,
        fields: [
          'name',
          'opening_hours',
          'formatted_address',
          'formatted_phone_number',
          'rating',
          'website'
        ]
      };

      service.getDetails(request, (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          store.setSelectedItem(place);
        }
      });
    },
    [map, store]
  );

  useEffect(() => {
    if (query) {
      searchByQuery(map, query);
    }
  }, [searchByQuery, query, map]);

  useEffect(() => {
    if (placeId) {
      getDetails(placeId);
    }
  }, [placeId, getDetails]);

  useEffect(() => {
    if (!map || !store.selectedItem) {
      return;
    }
    const currentCenter = map.getCenter();

    const { location } = store.selectedItem.geometry;
    const coord = {
      lat: location.lat(),
      lng: location.lng()
    };
    const isCurrentPos = currentCenter.lng() === coord.lng && currentCenter.lng() === coord.lat;
    if (!isCurrentPos) {
      setCenter(store.selectedItem);
    }
  }, [map, store.selectedItem]);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    language: 'Ru-ru',
    libraries: libraries
  });

  const searchNearby = (map, center) => {
    const service = new window.google.maps.places.PlacesService(map);

    const request = {
      location: center,
      radius: '20000',
      pageToken: store.page,
      types: requestTypes
    };

    service.nearbySearch(request, (results, status, pagination) => {
      if (pagination && pagination.hasNextPage) {
        store.loadNextPage = () => pagination.nextPage();
      }

      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        if (store.page === 1) {
          store.setItems(results);
        } else {
          store.addItems(results);
        }
      } else {
        console.log(status);
      }
    });
  };

  const addLocateButton = (map) => {
    const getCurrentPosition = () => {
      if (!window.navigator) {
        return;
      }
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          store.setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => null
      );
    };

    const locate = document.createElement('div');

    locate.className = 'locate';
    locate.innerHTML = `
      <img src=${compass} alt="compass" />
    `;

    locate.addEventListener('click', getCurrentPosition);

    map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(locate);
  };

  const onLoad = (map) => {
    setMap(map);
    store.setMap(map);
    addLocateButton(map);

    searchNearby(map, map.center);
  };

  const handleZoom = () => {
    const zoom = map?.getZoom();
    store.setZoom(zoom);
  };

  const handleMarkerClick = (item) => {
    setCenter(item);
    store.setSelectedItem(item);
  };

  const setCenter = (item) => {
    const coord = {
      lat: item.geometry.location.lat(),
      lng: item.geometry.location.lng()
    };
    map.setCenter(coord);
    store.setCurrentPosition(coord);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords;
        center = { lat: latitude, lng: longitude };
      },
      () => {
        center = store.currentPosition;
      }
    );
  }, []);

  const InfoContent = ({ item }) => {
    return (
      <div className="info-content">
        <div className="item-name">{item.name}</div>

        <div className="item-address">
          {item.formatted_address ? (
            <span>{item.formatted_address}</span>
          ) : item.vicinity ? (
            <span>{item.vicinity}</span>
          ) : null}
        </div>
        <div className="item-rating">{item.rating ? <span>⭐ {item.rating}</span> : null}</div>
        <div className="item-link" onClick={() => onLinkClick(item.place_id)}>
          Подробнее
        </div>
      </div>
    );
  };

  return isLoaded ? (
    <div className="map-wrapper">
      <GoogleMap
        mapContainerClassName="map"
        zoom={store.zoom || 15}
        center={center}
        onLoad={onLoad}
        clickableIcons={false}
        onZoomChanged={handleZoom}
      >
        {store.items.map((item) => (
          <Marker
            title={item.name}
            key={item.place_id}
            name={item.name}
            onClick={() => handleMarkerClick(item)}
            position={{
              lat: item.geometry.location.lat(),
              lng: item.geometry.location.lng()
            }}
          />
        ))}

        {store.selectedItem ? (
          <InfoWindow
            position={{
              lat: store.selectedItem.geometry.location.lat(),
              lng: store.selectedItem.geometry.location.lng()
            }}
            onCloseClick={onClose}
          >
            <InfoContent item={store.selectedItem} />
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  ) : (
    <Spinner />
  );
};

export default observer(Map);
