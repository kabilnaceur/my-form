import { FC } from "react";
import { Element } from "../../utils/types";
import styles from "./input.module.scss";

export interface inputProps {
  element: Element;
}

const Input: FC<inputProps> = ({ element }) => {
  return (
    <label
      className={styles.InputStyles}
      style={{
        flexDirection:
          element.type === "checkbox" || element.type === "radio"
            ? "row"
            : "column",
      }}
    >
      {element.type === "button" ? "" : element.name}
      <input
        type={element.type}
        placeholder={element.name}
        name={element.name}
        id={element.id}
        value={element.type === "button" ? element.name : ""}
        style={{
          backgroundColor: element.style.backgroud,
          color: element.style.color,
          border: `2px solid ${element.style.borderColor}`,
          fontSize: +element.style.fontSize,
          borderRadius: +element.style.borderRadius,
          width: element.type === "button" ? 200 : "",
          cursor: element.type === "button" ? "pointer" : "default",
        }}
      />
    </label>
  );
};

export default Input;
