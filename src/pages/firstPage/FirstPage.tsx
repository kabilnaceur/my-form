import "../../styles/main.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/app/store";
import styles from "./firstPage.module.scss";
import homeImage from "../../assets/images/homeImage.webp";
import logo from "../../assets/images/logo.png";
import { ChangeEvent } from "react";

function FirstPage() {
  const theme = useSelector((state: RootState) => state.application.theme);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/json") {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result as string);
          console.log(data); // Log the file contents to the console
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
                <button>Get Stared</button>
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
