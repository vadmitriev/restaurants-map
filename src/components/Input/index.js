import React from 'react';

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
      <input type="text" className="textbox" placeholder="Search" onKeyUp={handleKeyUp} />
      <input title="Search" value="🔎" type="submit" className="button" onSubmit={handleSubmit} />
    </div>
  );
};

export default Input;
