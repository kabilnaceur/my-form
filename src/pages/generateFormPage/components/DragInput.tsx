import { Dispatch, FC } from "react";
import { useSelector } from "react-redux";
import Input from "../../../components/input/Input";
import { RootState } from "../../../redux/app/store";
import { Element } from "../../../utils/types";
import styles from "../generateFormPage.module.scss";
import { FiEdit2 } from "react-icons/fi";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { AiOutlineDrag } from "react-icons/ai";
import { SetStateAction } from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../../../utils/constants";

export interface dragInputProps {
  element: Element;
  index: number;
  formElements: Element[];
  setFormElements: Dispatch<SetStateAction<Element[]>>;
  setElementEdit: Dispatch<SetStateAction<Element>>;
}

const DragInput: FC<dragInputProps> = ({
  formElements,
  setFormElements,
  setElementEdit,
  element,
  index,
}) => {
  const theme = useSelector((state: RootState) => state.application.theme);
  const handleDelete = (index: number): void => {
    const newElements = [...formElements];
    newElements.splice(index, 1);
    setFormElements(newElements);
  };

  const handleEdit = (element: Element): void => {
    setElementEdit(element);
  };

  return (
    <div className={styles[theme]}>
      <div className={styles.elementCard}>
        <button>
          <AiOutlineDrag />
        </button>
        <Input element={element} />
        <button onClick={() => handleEdit(element)}>
          <FiEdit2 />
        </button>
        <button onClick={() => handleDelete(index)}>
          <IoMdRemoveCircleOutline />
        </button>
      </div>
    </div>
  );
};

export default DragInput;
