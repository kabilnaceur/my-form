import { FC } from "react";
import { useSelector } from "react-redux";
import Input from "../../../components/input/Input";
import { RootState } from "../../../redux/app/store";
import { Form } from "../../../utils/types";
import styles from "../previewPage.module.scss";

export interface formElementProps {
  form: Form;
}

const FormElement: FC<formElementProps> = ({ form }) => {
  const theme = useSelector((state: RootState) => state.application.theme);

  return (
    <div className={styles[theme]}>
      <div className={`${styles.form}`}>
        <form>
          <h3>{form.name}</h3>
          <p>{form.description}</p>
          {form.elements.map((element, index) => (
            <Input element={element} />
          ))}
        </form>
      </div>
    </div>
  );
};

export default FormElement;
