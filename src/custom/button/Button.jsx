import React, { useState } from "react";
import styles from "./button.module.css";

const Button = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const { color, bgColor, title, hoverColor } = props;

  function addStyles(color, bgColor, hoverColor) {
    return {
      color: color,
      backgroundColor: isHovered ? hoverColor : bgColor,
      transform: isHovered ? "scale(1.01)" : "",
    };
  }

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };



  return (
    <>
      <button
        onClick={props.onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={styles.buttonCss}
        style={addStyles(color, bgColor, hoverColor)}
      >
        {title}
      </button>
    </>
  );
};

export default Button;
