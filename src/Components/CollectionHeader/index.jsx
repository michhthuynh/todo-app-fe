import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FastField, Formik } from 'formik';
import AutoFocusField from '../../custom-fields/AutoFocusField';
import API from '../../utils/API';
import tokenConfig from '../../utils/tokenConfig';

CollectionHeader.propTypes = {
  title: PropTypes.string,
  collectionID: PropTypes.string,
  onClickRemove: PropTypes.func,
  onChangeTitle: PropTypes.func,
};

CollectionHeader.defaultProps = {
  title: "",
  collectionID: "",
  onChangeTitle: null,
  onClickRemove: null,
}

const randomID = () => {
  return Math.ceil(Math.random() * Math.pow(10, 8))
}

function CollectionHeader(props) {
  const { title, collectionID, onClickRemove, onChangeTitle } = props
  const [showButton, setShowButton] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const handleClickShowButton = () => {
    setShowButton(!showButton)
  }

  const handleClickRemove = () => {
    if (!onClickRemove) return
    onClickRemove(collectionID)
  }

  const handleEditClick = () => {
    setShowForm(true)
  }

  const handleOnblur = () => {
    setShowForm(false)
  }

  return (
    <div className="collection__header">
      <div className="collection__header__title">
        {title}
      </div>
      <button className="collection__header__btn" onClick={handleClickShowButton}>
        <FontAwesomeIcon icon={faEllipsisH} />
      </button>

      {showButton &&
        <div className="collection__header__control">
          <button onClick={handleEditClick}>
            edit
          </button>
          <button onClick={handleClickRemove}>
            remove
          </button>
        </div>
      }
      {
        showForm &&
        <div className="collection__header__control">
          <Formik
            initialValues={{ editTitle: '' }}
            onSubmit={(values, { resetForm }) => {
              if (!onChangeTitle) return
              onChangeTitle({
                collectionID,
                title: values.editTitle
              })
            }}
          >
            {
              formProps => {
                return (
                  <form onSubmit={formProps.handleSubmit} onBlur={handleOnblur}>
                    <FastField
                      name='editTitle'
                      component={AutoFocusField}

                      className="editTitle"
                    />
                  </form>
                )
              }
            }
          </Formik>
        </div>
      }
    </div>
  );
}

export default CollectionHeader;