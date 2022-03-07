import { makeAutoObservable, toJS } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

class RestaurantStore {
  _isLoading = true;

  _currentPosition = {
    lat: 28.6139,
    lng: 77.209
  };

  _zoom = 15;
  _selectedItem = null;
  _items = [];

  _modalVisible = false;

  constructor() {
    makeAutoObservable(this);
    // makePersistable(this, {
    //   name: 'RestaurantStore',
    //   properties: ['currentPosition', 'zoom', 'selectedItem']
    // });
  }

  get isLoading() {
    return this._isLoading;
  }

  setIsLoading(value) {
    this._isLoading = value;
  }

  get selectedItem() {
    return toJS(this._selectedItem);
  }

  setSelectedItem(item) {
    this._selectedItem = item;
  }

  setItems(data) {
    this._items = data;
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

  get modalVisible() {
    return this._modalVisible;
  }

  setModalVisible(value) {
    this._modalVisible = value;
  }
}

export default new RestaurantStore();
