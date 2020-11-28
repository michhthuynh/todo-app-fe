import React from 'react';
import PropTypes from 'prop-types';

Checkbox.propTypes = {

};

function Checkbox(props) {
  const handleOnChange = e => {
    console.log(e.target.checked)
  }
  return (
    <input type="checkbox" name="test" onChange={handleOnChange} />
  );
}

export default Checkbox;