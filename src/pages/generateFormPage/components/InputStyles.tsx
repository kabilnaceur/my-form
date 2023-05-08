import { Dispatch, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/app/store";
import styles from "../generateFormPage.module.scss";
import { SketchPicker } from "react-color";
import { SetStateAction } from "react";
import { FC } from "react";
import { Element } from "../../../utils/types";

enum TabName {
  Details = "Details",
  Styles = "Styles",
}

export interface inputStylesProps {
  elementEdit: Element;
  formElements: Element[];
  setElementEdit: Dispatch<SetStateAction<Element>>;
  setFormElements: Dispatch<SetStateAction<Element[]>>;
}

const InputStyles: FC<inputStylesProps> = ({
  elementEdit,
  formElements,
  setFormElements,
  setElementEdit,
}) => {
  const theme = useSelector((state: RootState) => state.application.theme);
  const [activeTab, setActiveTab] = useState(TabName.Details);
  const [backgroundColor, setBackgroundColor] = useState<string>(
    elementEdit.style.backgroud
  );
  const [borderColor, setBorderColor] = useState<string>(
    elementEdit.style.borderColor
  );
  const [color, setColor] = useState<string>(elementEdit.style.color);
  const [isHoveringColor, setIsHoveringColor] = useState<Boolean>(false);
  const [isHoveringBorder, setIsHoveringBorder] = useState<Boolean>(false);
  const [isHoveringBackgroung, setIsHoveringBackground] =
    useState<Boolean>(false);
  const [fontSize, setFontSize] = useState<string>(elementEdit.style.fontSize);
  const [borderRadius, setBorderRadius] = useState<string>(
    elementEdit.style.borderRadius
  );
  useEffect(() => {
    setFontSize(elementEdit.style.fontSize);
    setColor(elementEdit.style.color);
    setBorderColor(elementEdit.style.borderColor);
    setBorderRadius(elementEdit.style.borderRadius);
  }, [elementEdit]);

  const handleMouseOverColor = () => {
    setIsHoveringColor(true);
  };

  const handleMouseOutColor = () => {
    setIsHoveringColor(false);
  };
  const handleMouseOverBorder = () => {
    setIsHoveringBorder(true);
  };

  const handleMouseOutBorder = () => {
    setIsHoveringBorder(false);
  };
  const handleMouseOverBackground = () => {
    setIsHoveringBackground(true);
  };

  const handleMouseOutBackground = () => {
    setIsHoveringBackground(false);
  };

  const handleChangeBackgroud = (newColor: any): void => {
    setBackgroundColor(newColor.hex);

    const newElement = {
      ...elementEdit,
      style: { ...elementEdit?.style, backgroud: newColor.hex },
    };
    setElementEdit(newElement);
    console.log(newElement);
  };

  const handleChangeBorder = (newColor: any): void => {
    setBorderColor(newColor.hex);
    const newElement = {
      ...elementEdit,
      style: { ...elementEdit.style, borderColor: newColor.hex },
    };
    setElementEdit(newElement);
  };

  const handleChangeColor = (newColor: any): void => {
    setColor(newColor.hex);
    const newElement = {
      ...elementEdit,
      style: { ...elementEdit.style, color: newColor.hex },
    };
    setElementEdit(newElement);
  };

  const handleClick = (tabName: TabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className={styles[theme]}>
      <div className={styles.inputStylesCard}>
        <div className="tab-container">
          <div
            className={`tab${activeTab === TabName.Details ? " active" : ""}`}
            onClick={() => handleClick(TabName.Details)}
          >
            {TabName.Details}
          </div>
          <div
            className={`tab${activeTab === TabName.Styles ? " active" : ""}`}
            onClick={() => handleClick(TabName.Styles)}
          >
            {TabName.Styles}
          </div>
        </div>
        {activeTab === TabName.Details && (
          <div className={styles.inputDetailsDiv}>
            <h4>Element Details</h4>
            <div className={styles.inputDetails}>
              {" "}
              <label>Element name</label>
              <input placeholder="Element name" />
            </div>
            <div className={styles.inputDetails}>
              <label>Element id</label>
              <input placeholder="Element id" />
            </div>
            <div>
              <label className="container">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Is required
              </label>
            </div>
          </div>
        )}
        {activeTab === TabName.Styles && (
          <div className={styles.inputStylesDiv}>
            {" "}
            <h4>Element styles</h4>
            <div className="relative">
              <label>Backgroud color</label>
              <div
                className={styles.backgroudColorDiv}
                onMouseOver={handleMouseOverBackground}
                onMouseOut={handleMouseOutBackground}
              >
                <div style={{ backgroundColor: elementEdit.style.backgroud }} />{" "}
                {elementEdit.style.backgroud}
              </div>
              <div
                className={isHoveringBackgroung ? "pickerDiv" : "hidden"}
                onMouseOver={handleMouseOverBackground}
                onMouseOut={handleMouseOutBackground}
              >
                <SketchPicker
                  color={backgroundColor}
                  onChange={handleChangeBackgroud}
                />
              </div>
            </div>
            <div className="relative">
              <label>Boder color</label>
              <div
                className={styles.backgroudColorDiv}
                onMouseOver={handleMouseOverBorder}
                onMouseOut={handleMouseOutBorder}
              >
                <div
                  style={{ backgroundColor: elementEdit.style.borderColor }}
                />{" "}
                {elementEdit.style.borderColor}
              </div>

              <div
                className={isHoveringBorder ? "pickerDiv" : "hidden"}
                onMouseOver={handleMouseOverBorder}
                onMouseOut={handleMouseOutBorder}
              >
                <SketchPicker
                  color={borderColor}
                  onChange={handleChangeBorder}
                />
              </div>
            </div>
            <div className="relative">
              <label>Color</label>
              <div
                className={styles.backgroudColorDiv}
                onMouseOver={handleMouseOverColor}
                onMouseOut={handleMouseOutColor}
              >
                <div style={{ backgroundColor: elementEdit.style.color }} />
                {elementEdit.style.color}
              </div>
              <div
                className={isHoveringColor ? "pickerDiv" : "hidden"}
                onMouseOver={handleMouseOverColor}
                onMouseOut={handleMouseOutColor}
              >
                <SketchPicker color={color} onChange={handleChangeColor} />
              </div>
            </div>
            <div>
              <label>Font size</label>
              <div className="slider">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={fontSize}
                  onChange={(e) => {
                    setFontSize(e.target.value);
                    setElementEdit({
                      ...elementEdit,
                      style: {
                        ...elementEdit.style,
                        fontSize: e.target.value,
                      },
                    });
                  }}
                />
                <p id="rangeValue">{fontSize}</p>
              </div>
            </div>
            <div>
              <label> Border radius</label>
              <div className="slider">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={borderRadius}
                  onChange={(e) => {
                    setBorderRadius(e.target.value);
                    setElementEdit({
                      ...elementEdit,
                      style: {
                        ...elementEdit.style,
                        borderRadius: e.target.value,
                      },
                    });
                  }}
                />
                <p id="rangeValue">{borderRadius}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputStyles;
