import React from "react";
import styles from './DeletedStamp.module.scss';

const DeletedStamp = ({ positionStyles }) => {
  return (
    <div className={styles['deleted-stamp']} style={positionStyles}>deleted</div>
  )
}

export default DeletedStamp;