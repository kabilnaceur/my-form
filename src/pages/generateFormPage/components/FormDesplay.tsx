import { Dispatch, FC, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/app/store";
import { Element } from "../../../utils/types";
import styles from "../generateFormPage.module.scss";
import { SetStateAction } from "react";
import DragInput from "./DragInput";
import update from "immutability-helper";

export interface formDesplayProps {
  formName: string;
  formDescription: string;
  formElements: Element[];
  setFormElements: Dispatch<SetStateAction<Element[]>>;
  setElementEdit: Dispatch<SetStateAction<Element>>;
}
export interface Item {
  id: number;
  text: string;
}

export interface ContainerState {
  elements: Element[];
}
const FormDesplay: FC<formDesplayProps> = ({
  formName,
  formDescription,
  formElements,
  setFormElements,
  setElementEdit,
}) => {
  const theme = useSelector((state: RootState) => state.application.theme);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setFormElements((prevCards: Element[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as Element],
        ],
      })
    );
  }, []);
  const renderCard = useCallback((element: Element, index: number) => {
    return (
      <DragInput
        element={element}
        index={index}
        moveCard={moveCard}
        setFormElements={setFormElements}
        id={element.id}
        setElementEdit={setElementEdit}
        key={element.id}
      />
    );
  }, []);
  return (
    <div className={styles[theme]}>
      <div className={styles.formDesplayCard}>
        <h4 style={{ textAlign: "start" }}>Form desplay</h4>
        <h3>{formName}</h3>
        <p>{formDescription}</p>
        <div>{formElements.map((card, i) => renderCard(card, i))}</div>
      </div>
    </div>
  );
};

export default FormDesplay;
