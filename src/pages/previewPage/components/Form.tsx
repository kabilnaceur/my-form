import { useSelector } from "react-redux";
import { RootState } from "../../../redux/app/store";
import styles from "../previewPage.module.scss";

function Form() {
  const theme = useSelector((state: RootState) => state.application.theme);

  return (
    <div className={styles[theme]}>
      <div className={`${styles.form}`}>
        <form></form>
      </div>
    </div>
  );
}

export default Form;
