import React from 'react';
import styles from './FloatButton.css';

const divStyle = {
  "marginTop": "22px"
};

const FloatButton = () => (
  <a className={styles.float}>
    <i style={divStyle}  className="fa fa-plus" ></i>
  </a>
);

export default FloatButton;
