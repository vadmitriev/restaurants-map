import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  const navigator = useNavigate();
  const handleClick = () => {
    navigator('/');
  };
  return <header onClick={handleClick}>Карта ресторанов</header>;
};

export default Header;
