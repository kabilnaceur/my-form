import "../../styles/main.scss";
import styles from "./navbar.module.scss";
import { changeTheme } from "../../redux/features/application/applicationSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/app/store";
import { BsMoon, BsSun } from "react-icons/bs";
import logo from "../../assets/images/logo.png";
import { MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.application.theme);

  const setTheme = (newTheme: string) => dispatch(changeTheme(newTheme));
  const handleButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <nav className={`${styles.nav} ${styles[theme]}`}>
      <div className={`flex-row space-between ${styles.divLogo}`}>
        <button className={styles.logoButton} onClick={() => navigate("/")}>
          <img alt="form logo" src={logo} className={styles.logo} />
          <h4>MyForm</h4>
        </button>
      </div>

      <div>
        <button onClick={handleButtonClick} className={styles.themeButton}>
          {" "}
          {theme === "dark" ? (
            <BsSun className={styles.icon} />
          ) : (
            <BsMoon className={styles.icon} />
          )}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
