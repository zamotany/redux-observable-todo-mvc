import React from 'react';
import PropTypes from 'prop-types';

const style = {
  fontSize: '18px',
  color: '#bf2828',
  paddingBottom: '10px',
  borderBottom: '1px solid #bf2828',
};

const ErrorMessage = ({ message }) => {
  if (!message) {
    return null;
  }

  return (
    <div style={style}>
      Error: {message}
    </div>
  );
};


ErrorMessage.propTypes = {
  message: PropTypes.string,
};

ErrorMessage.defaultProps = {
  message: '',
};

export default ErrorMessage;
