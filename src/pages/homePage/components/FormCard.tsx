import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/app/store";
import { Form } from "../../../utils/types";
import styles from "../homePage.module.scss";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";

export interface formCardProps {
  form: Form;
}

const FormCard: FC<formCardProps> = ({ form }) => {
  const navigate = useNavigate();
  const theme = useSelector((state: RootState) => state.application.theme);

  const handleDownload = () => {
    const json = JSON.stringify(form);
    const blob = new Blob([json], { type: "application/json" });
    saveAs(blob, `${form.name}.json`);
  };

  return (
    <div className={styles[theme]} key={form.id}>
      <div className={`${styles.formCard}`}>
        <div className={styles.formName}>
          <div className={styles.formImage}>🧸</div>
          {form.name}
        </div>
        <div className={styles.formButtonDiv}>
          <button
            className={styles.prviewButton}
            onClick={() => navigate("/preview", { state: { ...form } })}
          >
            {" "}
            Perview
          </button>
          <button className={styles.downoloadButton} onClick={handleDownload}>
            {" "}
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormCard;
