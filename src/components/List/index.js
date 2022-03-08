import React, { useCallback, useContext, useEffect, useRef } from 'react';

import { observer } from 'mobx-react-lite';

import { ListItem } from 'components';
import { Input } from 'components';

import { Context } from '../..';

import './List.scss';

const List = ({ onClick, onLinkClick, onSearch }) => {
  const { store } = useContext(Context);

  const loaderRef = useRef(null);

  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        store.loadNextPage();
      }
    },
    [store]
  );

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0
    };
    const observe = new IntersectionObserver(handleObserver, options);
    if (loaderRef.current) {
      observe.observe(loaderRef.current);
    }
  }, [handleObserver]);

  return (
    <div className="list-wrapper">
      <Input onSubmit={onSearch} />
      {store.items.length ? (
        <div className="list">
          {store.items.map((item) => (
            <ListItem
              key={item.place_id}
              item={item}
              onClick={() => onClick(item)}
              onLinkClick={() => onLinkClick(item.place_id)}
            />
          ))}
          <div ref={loaderRef} />
        </div>
      ) : (
        <div style={{ marginTop: '10px' }}>Здесь ничего нет</div>
      )}
    </div>
  );
};

export default observer(List);
