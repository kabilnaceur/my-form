import "../../styles/main.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/app/store";
import styles from "./generateFormPage.module.scss";
import FormDetails from "./components/FormDetails";
import FormInputs from "./components/FormInputs";
import InputStyles from "./components/InputStyles";
import FormDesplay from "./components/FormDesplay";
import { useEffect, useState } from "react";
import { Element, Form } from "../../utils/types";
import { saveAs } from "file-saver";
import { addForm } from "../../redux/features/form/formSlice";

function GenerateFormPage() {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.application.theme);
  const forms = useSelector((state: RootState) => state.forms.forms);
  const [formName, setFormName] = useState<string>("Form Name");
  const [elementEdit, setElementEdit] = useState<Element>({
    id: "",
    name: "",
    type: "",
    isRequired: false,
    style: {
      borderRadius: "0",
      borderColor: "#000000",
      fontSize: "10",
      color: "#000000",
      backgroud: "#ffffff",
    },
  });

  const [formElements, setFormElements] = useState<Element[]>([]);
  const [formDescription, setFormDescription] =
    useState<string>("Form description");

  const setForms = (newForm: Form) => dispatch(addForm(newForm));
  const handleDownload = () => {
    const Formdata: Form = {
      id: forms.length + formName,
      name: formName,
      description: formDescription,
      elements: formElements,
    };
    setForms(Formdata);
    const json = JSON.stringify(Formdata);
    const blob = new Blob([json], { type: "application/json" });
    saveAs(blob, `${formName}.json`);
  };
  useEffect(() => {
    console.log(elementEdit);
    const newElements = [...formElements];
    const index = newElements.findIndex(
      (element: Element) => element.id === elementEdit.id
    );
    if (index !== -1) {
      newElements[index] = elementEdit; // Replace it with elementEdit
    }
    setFormElements(newElements);
  }, [elementEdit]);

  return (
    <div className={theme}>
      <div className="background ">
        <div className={`${styles.homeContainer} ${styles[theme]}`}>
          <div className={styles.pageTitle}>
            <h4>Generate form</h4>
            <button onClick={handleDownload} className={styles.saveButton}>
              Save
            </button>
          </div>
          <div className={styles.gnerateFormDiv}>
            <FormDetails
              formDescription={formDescription}
              formName={formName}
              setFormDescription={setFormDescription}
              setFormName={setFormName}
            />
            <div className={styles.showGnerateForm}>
              <FormInputs
                setFormElements={setFormElements}
                formElements={formElements}
                setElementEdit={setElementEdit}
              />
              <FormDesplay
                formDescription={formDescription}
                formName={formName}
                formElements={formElements}
                setFormElements={setFormElements}
                setElementEdit={setElementEdit}
              />
              <InputStyles
                elementEdit={elementEdit}
                formElements={formElements}
                setFormElements={setFormElements}
                setElementEdit={setElementEdit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GenerateFormPage;
