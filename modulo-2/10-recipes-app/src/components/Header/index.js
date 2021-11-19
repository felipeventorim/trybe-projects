import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Search from '../SearchBar';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import './index.css';

function Header(props) {
  const [searchStatus, setSearchStatus] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const { title, displaySearchBtn } = props;

  function searchClick() {
    if (searchStatus === true) {
      setSearchStatus(false);
    } else {
      setSearchStatus(true);
    }
  }

  function profileClick() {
    setRedirect(true);
  }

  function btnProfile() {
    return (
      <input
        type="image"
        data-testid="profile-top-btn"
        onClick={ () => profileClick() }
        src={ profileIcon }
        alt="botão de perfil"
      />
    );
  }

  function btnSearch() {
    return (
      <input
        type="image"
        data-testid="search-top-btn"
        onClick={ () => searchClick() }
        src={ searchIcon }
        alt="botão de busca"
      />
    );
  }

  function headerTitle() {
    return (
      <h2 data-testid="page-title">{ title }</h2>
    );
  }

  if (redirect) {
    return <Redirect to="/perfil" />;
  }
  if (searchStatus && displaySearchBtn) {
    return (
      <div className="header">
        { btnProfile() }
        { headerTitle() }
        { btnSearch() }
        <Search />
      </div>
    );
  }
  if (searchStatus === false && displaySearchBtn === true) {
    return (
      <div className="header">
        { btnProfile() }
        { headerTitle() }
        { btnSearch() }
      </div>
    );
  }

  if (displaySearchBtn === false) {
    return (
      <div className="header">
        { btnProfile() }
        { headerTitle() }
      </div>
    );
  }
  if (searchStatus === false && displaySearchBtn === true) {
    return (
      <div className="header">
        { btnProfile() }
        { headerTitle() }
        { btnSearch() }
      </div>
    );
  }

  return (
    <div />
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  displaySearchBtn: PropTypes.bool.isRequired,
};

export default Header;
