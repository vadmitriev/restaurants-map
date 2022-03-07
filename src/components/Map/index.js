import React, { useCallback, useContext, useEffect, useState } from 'react';

import { observer } from 'mobx-react-lite';
import { Context } from '../../index';

import { Marker as CustomMarker } from 'components';

import './Map.scss';
import Spinner from '../Spinner';

import { GoogleMap, useJsApiLoader, Marker, InfoBox } from '@react-google-maps/api';

let center = {
  lat: 57.97629,
  lng: 56.21793
};
const libraries = ['places'];

const Map = ({ query, placeId, onClick }) => {
  const { store } = useContext(Context);

  const [map, setMap] = useState(null);
  const [markerMap, setMarkerMap] = useState({});

  const searchByQuery = useCallback(
    (map, query) => {
      const service = new window.google.maps.places.PlacesService(map);
      store.setItems([]);

      const request = {
        location: map.center,
        radius: '200',
        type: ['restaurant'],
        query
      };

      service.textSearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesService.OK) {
          store.setItems(results);
        }
      });
    },
    [map, query]
  );

  const getDetails = useCallback(
    (placeId) => {
      const service = new window.google.maps.places.PlacesService(map);
      store.setSelectedItem(null);

      const request = {
        placeId,
        fields: ['name', 'opening_hours', 'formatted_address', 'formatted_phone_number']
      };

      service.getDetails(request, (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          store.setSelectedItem(place);
        }
      });
    },
    [map, placeId]
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords;
        center = { lat: latitude, lng: longitude };
      },
      () => {
        center = {
          lat: 57.97629,
          lng: 56.21793
        };
      }
    );
  }, []);

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
      type: ['restaurant']
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        store.setItems(results);
      } else {
        console.log(status);
      }
    });
  };

  const onLoad = (map) => {
    setMap(map);
    searchNearby(map, map.center);
  };

  const handleClick = (e) => {
    console.log(e);
  };

  const handleZoom = () => {
    const zoom = map?.getZoom();
    store.setZoom(zoom);
  };

  const handleMouseDown = (e) => {
    console.log(e);
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerClassName="map"
      zoom={store.zoom}
      center={center}
      onLoad={onLoad}
      clickableIcons={false}
      onClick={handleClick}
      onZoomChanged={handleZoom}
    >
      {store.items.map((item) => (
        <Marker
          title={item.name}
          key={item.place_id}
          name={item.name}
          onClick={() => onClick(item)}
          position={{
            lat: item.geometry.location.lat(),
            lng: item.geometry.location.lng()
          }}
          onMouseDown={handleMouseDown}
        />
      ))}
    </GoogleMap>
  ) : (
    <Spinner />
  );
};

export default observer(Map);
