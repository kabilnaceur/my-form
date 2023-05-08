import { Dispatch, FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/app/store";
import { Element } from "../../../utils/types";
import styles from "../generateFormPage.module.scss";
import { SetStateAction } from "react";
import DragInput from "./DragInput";

export interface formDesplayProps {
  formName: string;
  formDescription: string;
  formElements: Element[];
  setFormElements: Dispatch<SetStateAction<Element[]>>;
  setElementEdit: Dispatch<SetStateAction<Element>>;
}

const FormDesplay: FC<formDesplayProps> = ({
  formName,
  formDescription,
  formElements,
  setFormElements,
  setElementEdit,
}) => {
  const theme = useSelector((state: RootState) => state.application.theme);

  return (
    <div className={styles[theme]}>
      <div className={styles.formDesplayCard}>
        <h4 style={{ textAlign: "start" }}>Form desplay</h4>
        <h3>{formName}</h3>
        <p>{formDescription}</p>
        {formElements.map((element, index) => (
          <DragInput
            element={element}
            setFormElements={setFormElements}
            index={index}
            formElements={formElements}
            setElementEdit={setElementEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default FormDesplay;
