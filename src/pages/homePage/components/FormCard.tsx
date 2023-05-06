import { useSelector } from "react-redux";
import { RootState } from "../../../redux/app/store";
import styles from "../homePage.module.scss";

function FormCard() {
  const theme = useSelector((state: RootState) => state.application.theme);

  return (
    <div className={styles[theme]}>
      <div className={`${styles.formCard}`}>
        <div className={styles.formName}>
          <div className={styles.formImage}>🧸</div>
          My sweat form
        </div>
        <div className={styles.formButtonDiv}>
          <button className={styles.prviewButton}> Perview</button>
          <button className={styles.downoloadButton}> Download</button>
        </div>
      </div>
    </div>
  );
}

export default FormCard;
