import "../../styles/main.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/app/store";
import styles from "./firstPage.module.scss";
import homeImage from "../../assets/images/homeImage.webp";
import logo from "../../assets/images/logo.png";
import { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { addForm } from "../../redux/features/form/formSlice";
import { Form } from "../../utils/types";
import { useEffect } from "react";

function FirstPage() {
  const navigate = useNavigate();
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
          navigate("/preview", {
            state: { ...data, id: forms.length + data.name },
          });
        } catch (error) {
          console.error("Error parsing JSON file", error);
        }
      };
      reader.readAsText(file);
    } else {
      console.error("Invalid file type, please select a JSON file");
    }
  };

  useEffect(() => {
    if (forms.length > 0) navigate("/home");
  }, []);
  
  return (
    <div className={theme}>
      <div className="background ">
        <div className={`${styles.homeContainer} ${styles[theme]}`}>
          <div>
            <h1>GENERATE YOUR OWN FORM</h1>
            <div>
              Get your Json form file and copy the code for your website
            </div>
            <h2>
              Code your own HTML form and style it, then point your form to
              formcarry to get email notifications, upload files, block spam and
              integrate with other apps.
            </h2>
            <div>
              <div className={styles.imageContent}>
                <img alt="home_image" src={homeImage} />
                <button onClick={() => navigate("/generate-form")}>
                  Get Stared
                </button>
                <div className={styles.disktopDiv}>
                  <div className={styles.disktopHeader}>
                    <div className={styles.disktopButton}>
                      <div className={styles.closeButton} />
                      <div className={styles.hideButton} />
                      <div className={styles.agrandirButton} />
                    </div>
                    <div className={styles.disktopUrlDiv}>
                      <div className={styles.disktopUrl}>MyForm.com</div>
                    </div>
                  </div>
                  <div className={styles.disktopBody}>
                    <div className={styles.disktopLogo}>
                      <img alt="form logo" src={logo} className={styles.logo} />
                      <h4> MyForm</h4>
                    </div>
                    <div className={styles.disktopForm}>
                      <div className={styles.disktopFormImage}>🧸</div>
                      My sweat form
                    </div>
                    <div className={styles.disktopInput}>
                      Your form json file
                      <div className={styles.disktopInputDiv}>
                        formFile.json
                        <label
                          htmlFor="json-file-input"
                          className={styles.fileInputLabel}
                        >
                          Choosea a file
                          <input
                            type="file"
                            id="json-file-input"
                            accept="application/json"
                            className={styles.fileInput}
                            onChange={handleFileChange}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FirstPage;
