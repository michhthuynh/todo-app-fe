import React from 'react';
import PropTypes from 'prop-types';
import Task from '../Task';

CollectionList.propTypes = {
  task: PropTypes.array
};

CollectionList.defaultProps = {
  task: []
}

const handleOnClickEditTask = id => {

}

const handleOnClickRemoveTask = id => {

}

function CollectionList(props) {
  const { task } = props
  return (
    <div className="collection__list">
      {
        task.map(({ description, id }, index) => {
          return <Task description={description} id={id} key={index} onClickRemove={handleOnClickRemoveTask} onClickEdit={handleOnClickEditTask} />
        })
      }
    </div>
  );
}

export default CollectionList;