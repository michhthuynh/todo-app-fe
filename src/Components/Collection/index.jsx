import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import './Collection.scss'

Collection.propTypes = {

};

function Collection(props) {
  return (
    <div className="collection">
      <div className="collection__title">
        username
      </div>
      <div className="collection__list">
        <div className="collection__list__item">
          <input type="checkbox" />
          <div className="collection__list__item__info">
            huynh hoang
          </div>
          <button>
            <FontAwesomeIcon icon={faPen} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Collection;