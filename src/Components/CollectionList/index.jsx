import React from 'react';
import PropTypes from 'prop-types';
import Task from '../Task';

CollectionList.propTypes = {
  task: PropTypes.array,
  onSubmit: PropTypes.func,
  onRemoveTask: PropTypes.func,
};

CollectionList.defaultProps = {
  task: [],
  onSubmit: null,
  onRemoveTask: null,
}

function CollectionList(props) {
  const { task, onSubmit, onRemoveTask } = props

  const handleChangeDes = e => {
    if (!onSubmit) return
    onSubmit(e)
  }

  const handleOnClickRemoveTask = id => {
    if (!onRemoveTask) return
    onRemoveTask(id)
  }
  return (
    <div className="collection__list">
      {
        task.map(({ description, _id, status }, index) => {
          return <Task
            description={description}
            taskID={_id}
            key={index}
            onClickRemove={handleOnClickRemoveTask}
            onSubmit={handleChangeDes}
            status={status}
          />
        })
      }
    </div>
  );
}

export default CollectionList;