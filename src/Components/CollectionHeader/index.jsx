import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { faEllipsisH, faPen, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FastField, Formik } from 'formik';
import AutoFocusField from '../../custom-fields/AutoFocusField';
import './CollectionHeader.scss'

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
    setShowButton(false)
  }

  const handleEditClick = () => {
    setShowForm(true)
    setShowButton(false)
  }

  const handleOnblur = () => {
    setShowForm(false)
  }

  return (
    <div className="collection__header">
      <div className="collection__header__title">
        {title}
      </div>
      <button className={!showButton ? `collection__header__btn` : `collection__header__btn change`} onClick={handleClickShowButton}>
        <span>
          {
            !showButton ? <FontAwesomeIcon icon={faEllipsisH} /> : <FontAwesomeIcon icon={faTimes} />
          }
        </span>
      </button>
      {/* {
        !showForm &&

      } */}

      {showButton &&
        <div className="collection__header__control">
          <button onClick={handleEditClick}>
            <span>
              <FontAwesomeIcon icon={faPen} />
            </span>
          </button>
          <button onClick={handleClickRemove}>
            <span>
              <FontAwesomeIcon icon={faTrash} />
            </span>
          </button>
        </div>
      }
      {
        showForm &&
        <div className="collection__header__form">
          <Formik
            initialValues={{ editTitle: '' }}
            onSubmit={(values, { resetForm }) => {
              if (!onChangeTitle) return
              onChangeTitle({
                collectionID,
                title: values.editTitle
              })
              setShowButton(false)
              setShowForm(false)
            }}
          >
            {
              formProps => {
                return (
                  <form onSubmit={formProps.handleSubmit} onBlur={handleOnblur}>
                    <FastField
                      name='editTitle'
                      component={AutoFocusField}

                      placeholder="New title"
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