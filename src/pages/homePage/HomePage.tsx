import "../../styles/main.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/app/store";
import styles from "./homePage.module.scss";
import FormCard from "./components/FormCard";

function HomePage() {
  const theme = useSelector((state: RootState) => state.application.theme);

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
              />
            </label>
          </div>
          <div className={styles.formContainer}>
            <FormCard />
            <FormCard />
            <FormCard />
            <FormCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
