import { ChangeEvent, SetStateAction } from "react";
import { Dispatch, FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/app/store";
import styles from "../generateFormPage.module.scss";

export interface formDetailsProps {
  formName: string;
  formDescription: string;
  setFormName: Dispatch<SetStateAction<string>>;
  setFormDescription: Dispatch<SetStateAction<string>>;
}

const FormDetails: FC<formDetailsProps> = ({
  formName,
  formDescription,
  setFormName,
  setFormDescription,
}) => {
  const theme = useSelector((state: RootState) => state.application.theme);

  const handleFormDescriptionChange = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormDescription(event.target.value);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormName(event.target.value);
  };

  return (
    <div className={styles[theme]}>
      <div className={styles.formDetailsCard}>
        <input
          placeholder="Form name"
          className={styles.nameInput}
          onChange={handleChange}
          value={formName}
        />
        <textarea
          placeholder="Form discription . . ."
          className={styles.descriptionInput}
          value={formDescription}
          onChange={handleFormDescriptionChange}
        />
      </div>
    </div>
  );
};

export default FormDetails;
