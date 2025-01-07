import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Navigation({ authUser, signOut }) {
  const { avatar, name } = authUser;

  return (
    <div className="navigation">
      <img
        src={avatar}
        alt={`Avatar of ${name}`}
        title={name}
        className="navigation__avatar"
      />
      <nav>
        <Link to="/">Home</Link>
        <Link to="/leaderboards">Leaderboards</Link>
      </nav>
      <button
        type="button"
        onClick={signOut}
      >
        Sign out
      </button>
    </div>
  );
}


const authUserShape = {
  email: PropTypes.string.isRequired, // Menggunakan email sesuai API
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired, // Menggunakan avatar untuk foto profil
};

Navigation.propTypes = {
  authUser: PropTypes.shape(authUserShape).isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Navigation;
