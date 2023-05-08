import { useSelector } from "react-redux";
import { RootState } from "../../../redux/app/store";
import { Element, Input } from "../../../utils/types";
import styles from "../generateFormPage.module.scss";
import { inputs } from "../inputs";
import { BiText } from "react-icons/bi";
import { Dispatch, FC, ReactElement } from "react";
import { BsCalendar2Date, BsTelephone } from "react-icons/bs";
import { AiOutlineCheckSquare, AiOutlineFile } from "react-icons/ai";
import { TbNumbers, TbSelect } from "react-icons/tb";
import { IoMdRadioButtonOn } from "react-icons/io";
import { RxButton } from "react-icons/rx";
import { SetStateAction } from "react";

export interface formInputsProps {
  setFormElements: Dispatch<SetStateAction<Element[]>>;
  formElements: Element[];
  setElementEdit: Dispatch<SetStateAction<Element>>;
}

const FormInputs: FC<formInputsProps> = ({
  setFormElements,
  formElements,
  setElementEdit,
}) => {
  const theme = useSelector((state: RootState) => state.application.theme);
  const inputIcon = (input: Input): ReactElement => {
    switch (input.type) {
      case "text":
        return <BiText />;
      case "date":
        return <BsCalendar2Date />;
      case "checkbox":
        return <AiOutlineCheckSquare />;
      case "tel":
        return <BsTelephone />;
      case "number":
        return <TbNumbers />;
      case "button":
        return <RxButton />;
      case "radio":
        return <IoMdRadioButtonOn />;
      case "select":
        return <TbSelect />;
      case "file":
        return <AiOutlineFile />;
    }
  };

  const handleElementClicked = (input: Input): void => {
    setElementEdit({
      id: input.type,
      name: input.type,
      type: input.type,
      isRequired: false,
      style: {
        borderRadius: "0",
        borderColor: "#000000",
        fontSize: "10",
        color: "#000000",
        backgroud: "#ffffff",
      },
    });
    setFormElements([
      ...formElements,
      {
        id: input.type,
        name: input.type,
        type: input.type,
        isRequired: false,
        style: {
          borderRadius: "0",
          borderColor: "#000000",
          fontSize: "10",
          color: "#000000",
          backgroud: "#ffffff",
        },
      },
    ]);
  };

  return (
    <div className={styles[theme]}>
      <div className={styles.formInputsCard}>
        {inputs.map((input: Input) => (
          <button
            className={styles.inputCard}
            key={input.id}
            onClick={() => handleElementClicked(input)}
          >
            {inputIcon(input)}
            {input.type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FormInputs;
