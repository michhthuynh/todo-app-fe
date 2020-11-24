import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

CollectionHeader.propTypes = {
  title: PropTypes.string,
  collectionID: PropTypes.string,
};

CollectionHeader.defaultProps = {
  title: "",
  collectionID: "",
}

function CollectionHeader(props) {
  const { title, collectionID } = props
  const [showButton, setShowButton] = useState(false)

  const handleClick = () => {
    setShowButton(!showButton)
  }

  const handleEditClick = () => {
    console.log("object")
  }

  return (
    <div className="collection__header">
      <div className="collection__header__title">
        {title}
      </div>
      <button className="collection__header__btn" onClick={handleClick}>
        <FontAwesomeIcon icon={faEllipsisH} />
      </button>

      {showButton &&
        <div className="collection__header__control">
          <button onClick={handleEditClick}>
            test
          </button>
        </div>
      }

    </div>
  );
}

export default CollectionHeader;