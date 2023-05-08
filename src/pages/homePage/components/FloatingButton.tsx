import { AiOutlinePlus } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../redux/app/store";
import styles from "../homePage.module.scss";

const FloatingButton = () => {
  const navigate = useNavigate();
  const theme = useSelector((state: RootState) => state.application.theme);

  return (
    <div className={styles[theme]}>
      <button
        className={styles.floatingButton}
        onClick={() => navigate("/generate-form")}
      >
        <AiOutlinePlus />{" "}
      </button>
    </div>
  );
};

export default FloatingButton;
