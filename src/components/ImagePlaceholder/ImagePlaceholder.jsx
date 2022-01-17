import React, { useState, useEffect } from "react";
import styles from './ImagePlaceholder.module.scss';

const ImagePlaceholder = ({ firstWord, secondWord, imgStyles }) => {

  const [placeholder, setPlaceholder] = useState(null);

  useEffect(() => {
    const textPlaceholder = firstWord[0] + secondWord[0];
    setPlaceholder(() => textPlaceholder.toUpperCase());
  }, [])

  return (
    <div style={imgStyles} className={styles["image-placeholder"]}>
      <span className={styles["image-placeholder__text"]}>{placeholder}</span>
    </div>
  )
}

export default ImagePlaceholder;