import React from 'react';
import PropTypes from 'prop-types';
import Task from '../Task';

CollectionList.propTypes = {
  task: PropTypes.array,
  onSubmit: PropTypes.func,
  onRemoveTask: PropTypes.func,
  onChecked: PropTypes.func,
};

CollectionList.defaultProps = {
  task: [],
  onSubmit: null,
  onRemoveTask: null,
  onChecked: null,
}

function CollectionList(props) {
  const { task, onSubmit, onRemoveTask, onChecked } = props

  const handleChangeDes = e => {
    if (!onSubmit) return
    onSubmit(e)
  }

  const handleOnClickRemoveTask = id => {
    if (!onRemoveTask) return
    onRemoveTask(id)
  }

  const handleOnChecked = e => {
    if (!onChecked) return
    onChecked(e)
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
            onCheckBox={handleOnChecked}
          />
        })
      }
    </div>
  );
}

export default CollectionList;