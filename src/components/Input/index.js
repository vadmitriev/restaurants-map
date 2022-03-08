import React from 'react';

import search from 'assets/search.svg';
import './Input.scss';

const Input = ({ onSubmit }) => {
  const handleSubmit = (e) => {
    const text = e.target.value;
    e.target.value = '';

    onSubmit(text);
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="input-wrapper">
      <input type="text" className="textbox" placeholder="Поиск" onKeyUp={handleKeyUp} />
      <span title="Search" className="button" onClick={handleSubmit}>
        <img src={search} alt="search" onClick={handleSubmit} />
      </span>
    </div>
  );
};

export default Input;
