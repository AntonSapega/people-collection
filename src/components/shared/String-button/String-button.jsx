import React from 'react';
import btnStyle from './String-button.module.scss';

const StringButton = (props) => {
  return (
    <button className={btnStyle['string-btn']} type='button' onClick={props.handleClick}>{props.children}</button>
  )
}

export default StringButton;