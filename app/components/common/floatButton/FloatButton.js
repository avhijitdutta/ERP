// @flow
import React from 'react';
import styles from './FloatButton.css';

const divStyle = {
  "marginTop": "22px",
  "color":'#fff',
  "cursor": "pointer"
};

type Props = {
  click: () => void
};

const FloatButton = (props: Props) => (
  <a className={styles.float} onClick={props.click}>
    <i style={divStyle} className="fa fa-plus" ></i>
  </a>
);

export default FloatButton;
