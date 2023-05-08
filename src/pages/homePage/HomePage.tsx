import "../../styles/main.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/app/store";
import styles from "./homePage.module.scss";
import FormCard from "./components/FormCard";
import { Form } from "../../utils/types";
import { ChangeEvent } from "react";
import { addForm } from "../../redux/features/form/formSlice";
import FloatingButton from "./components/FloatingButton";

function HomePage() {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.application.theme);
  const forms = useSelector((state: RootState) => state.forms.forms);

  const setForms = (newForm: Form) => dispatch(addForm(newForm));
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/json") {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result as string);
          setForms({ ...data, id: forms.length + data.name });
        } catch (error) {
          console.error("Error parsing JSON file", error);
        }
      };
      reader.readAsText(file);
    } else {
      console.error("Invalid file type, please select a JSON file");
    }
  };
  return (
    <div className={theme}>
      <div className="background ">
        <div className={`${styles.homeContainer} ${styles[theme]}`}>
          <div className={styles.pageTitle}>
            <h4>Your forms</h4>
            <label htmlFor="json-file-input" className={styles.fileInputLabel}>
              Import your form
              <input
                type="file"
                id="json-file-input"
                accept="application/json"
                className={styles.fileInput}
                onChange={handleFileChange}
              />
            </label>
          </div>
          <div className={styles.formContainer}>
            {forms.map((form: Form) => (
              <FormCard form={form} />
            ))}
          </div>
        </div>
      </div>
      <FloatingButton />
    </div>
  );
}

export default HomePage;
