import { ChangeEvent, Dispatch, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/app/store";
import styles from "../generateFormPage.module.scss";
import { SketchPicker } from "react-color";
import { SetStateAction } from "react";
import { FC } from "react";
import { Element } from "../../../utils/types";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { IoMdRemoveCircleOutline } from "react-icons/io";

enum TabName {
  Details = "Details",
  Styles = "Styles",
}

export interface inputStylesProps {
  elementEdit: Element;
  setElementEdit: Dispatch<SetStateAction<Element>>;
}

const InputStyles: FC<inputStylesProps> = ({ elementEdit, setElementEdit }) => {
  const theme = useSelector((state: RootState) => state.application.theme);
  const [activeTab, setActiveTab] = useState(TabName.Details);
  const [backgroundColor, setBackgroundColor] = useState<string>(
    elementEdit?.style.backgroud
  );
  const [borderColor, setBorderColor] = useState<string>(
    elementEdit?.style.borderColor
  );
  const [color, setColor] = useState<string>(elementEdit?.style.color);
  const [isHoveringColor, setIsHoveringColor] = useState<Boolean>(false);
  const [isHoveringBorder, setIsHoveringBorder] = useState<Boolean>(false);
  const [isHoveringBackgroung, setIsHoveringBackground] =
    useState<Boolean>(false);
  const [fontSize, setFontSize] = useState<string>(elementEdit?.style.fontSize);
  const [borderRadius, setBorderRadius] = useState<string>(
    elementEdit?.style.borderRadius
  );
  useEffect(() => {
    if (elementEdit) {
      setFontSize(elementEdit.style.fontSize);
      setColor(elementEdit.style.color);
      setBorderColor(elementEdit.style.borderColor);
      setBorderRadius(elementEdit.style.borderRadius);
    }
  }, [elementEdit]);

  const handleMouseOverColor = (): void => {
    setIsHoveringColor(true);
  };
  const handleAddOption = (): void => {
    if (elementEdit.options) {
      const newElement = {
        ...elementEdit,
        options: [...elementEdit.options, "option"],
      };
      setElementEdit(newElement);
    } else {
      const newElement = {
        ...elementEdit,
        options: ["option"],
      };
      setElementEdit(newElement);
    }
  };
  const handleEditOption = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    let newElement = {
      ...elementEdit,
    };
    const newOptions = [...newElement.options];
    newOptions[index] = event.target.value;
    newElement = { ...newElement, options: newOptions };
    setElementEdit(newElement);
  };
  const handleDeleteOption = (index: number): void => {
    let newElement = {
      ...elementEdit,
    };
    const newOptions = [...newElement.options];
    newOptions.splice(index, 1);
    newElement = { ...newElement, options: newOptions };
    setElementEdit(newElement);
  };
  const handleMouseOutColor = (): void => {
    setIsHoveringColor(false);
  };
  const handleMouseOverBorder = (): void => {
    setIsHoveringBorder(true);
  };

  const handleMouseOutBorder = (): void => {
    setIsHoveringBorder(false);
  };
  const handleMouseOverBackground = (): void => {
    setIsHoveringBackground(true);
  };

  const handleMouseOutBackground = (): void => {
    setIsHoveringBackground(false);
  };

  const handleChangeBackgroud = (newColor: any): void => {
    setBackgroundColor(newColor.hex);

    const newElement = {
      ...elementEdit,
      style: { ...elementEdit?.style, backgroud: newColor.hex },
    };
    setElementEdit(newElement);
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

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    const newElement = {
      ...elementEdit,
      name: event.target.value,
    };
    setElementEdit(newElement);
  };
  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    const newElement = {
      ...elementEdit,
      isRequired: checked,
    };
    setElementEdit(newElement);
  };
  return (
    <div className={styles[theme]}>
      <div className={styles.inputStylesCard}>
        <h4>Element configuration</h4>
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
            {elementEdit ? (
              <>
                {" "}
                <div className={styles.inputDetails}>
                  {" "}
                  <label>Element name</label>
                  <input
                    placeholder="Element name"
                    onChange={handleChangeName}
                    value={elementEdit?.name}
                  />
                </div>
                {elementEdit.type !== "button" && (
                  <div>
                    <label className="container">
                      <input
                        type="checkbox"
                        onChange={handleChangeCheckbox}
                        checked={elementEdit?.isRequired}
                      />
                      <span className="checkmark"></span>
                      Is required
                    </label>
                  </div>
                )}
                {elementEdit.type === "select" && (
                  <>
                    <div className={styles.inputOptions}>
                      {" "}
                      <label>Element options</label>
                      <button onClick={handleAddOption}>
                        <AiOutlinePlusCircle />
                      </button>
                    </div>
                    <div>
                      {elementEdit?.options?.map((option: string, index) => (
                        <div key={index} className={styles.optionsDiv}>
                          <input
                            value={option}
                            onChange={(e) => handleEditOption(index, e)}
                          />
                          <button onClick={() => handleDeleteOption(index)}>
                            <IoMdRemoveCircleOutline />
                          </button>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="flex">
                <h3> No element selected</h3>
              </div>
            )}
          </div>
        )}
        {activeTab === TabName.Styles && (
          <div className={styles.inputStylesDiv}>
            {" "}
            <h4>Element styles</h4>
            {elementEdit ? (
              elementEdit.type === "checkbox" ||
              elementEdit.type === "radio" ? (
                <div className="flex">
                  <h3> No styles for this element</h3>
                </div>
              ) : (
                <>
                  <div className="relative">
                    <label>Backgroud color</label>
                    <div
                      className={styles.backgroudColorDiv}
                      onMouseOver={handleMouseOverBackground}
                      onMouseOut={handleMouseOutBackground}
                    >
                      <div
                        style={{
                          backgroundColor: elementEdit?.style.backgroud,
                        }}
                      />{" "}
                      {elementEdit?.style.backgroud}
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
                        style={{
                          backgroundColor: elementEdit?.style.borderColor,
                        }}
                      />{" "}
                      {elementEdit?.style.borderColor}
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
                      <div
                        style={{ backgroundColor: elementEdit?.style.color }}
                      />
                      {elementEdit?.style.color}
                    </div>
                    <div
                      className={isHoveringColor ? "pickerDiv" : "hidden"}
                      onMouseOver={handleMouseOverColor}
                      onMouseOut={handleMouseOutColor}
                    >
                      <SketchPicker
                        color={color}
                        onChange={handleChangeColor}
                      />
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
                </>
              )
            ) : (
              <div className="flex">
                <h3> No element selected</h3>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InputStyles;
