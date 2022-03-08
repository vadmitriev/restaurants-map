import { makeAutoObservable, toJS } from 'mobx';

class RestaurantStore {
  _page = 10;

  _currentPosition = {
    lat: 58.01216,
    lng: 56.2384
  };

  _zoom = 15;
  _selectedItem = null;
  _items = [];

  _query = '';

  loadNextPage = () => {};

  constructor() {
    makeAutoObservable(this);
  }

  get page() {
    return this._page;
  }

  setPage(page) {
    this._page = page;
  }

  get selectedItem() {
    return toJS(this._selectedItem);
  }

  setSelectedItem(item) {
    this._selectedItem = item;
  }

  setItems(data) {
    this._items = [...this._items, ...data];
  }

  get items() {
    return toJS(this._items);
  }

  get zoom() {
    return toJS(this._zoom);
  }

  setZoom(value) {
    this._zoom = value;
  }

  get currentPosition() {
    return toJS(this._currentPosition);
  }

  setCurrentPosition(position) {
    this._currentPosition = position;
  }

  get query() {
    return toJS(this._query);
  }

  setQuery(query) {
    this._query = query;
  }
}

export default new RestaurantStore();
