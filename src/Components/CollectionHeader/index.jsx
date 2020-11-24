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
  handleChangeTitle: PropTypes.func,
  onClickRemove: PropTypes.func,
};

CollectionHeader.defaultProps = {
  title: "",
  collectionID: "",
  handleChangeTitle: null,
  onClickRemove: null,
}

function CollectionHeader(props) {
  const { title, collectionID, onClickRemove } = props
  const [showButton, setShowButton] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [titleCollection, setTitleCollection] = useState(title)


  // useEffect(() => {
  //   if (titleCollection === '') return
  //   const fetch = async () => {
  //     try {
  //       await API.put(`/collection/${collectionID}/title`, { title: titleCollection }, tokenConfig)
  //     } catch (error) {
  //       console.log('Can connect to database:', error.message)
  //     }
  //   }
  //   fetch()
  // }, [titleCollection, collectionID])

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
              setTitleCollection(values.editTitle)
              setShowForm(false)
              setShowButton(false)
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