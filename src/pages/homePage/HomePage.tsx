import logo from "../../logo.svg";
import "../../styles/main.scss";
import { changeTheme } from "../../redux/features/application/applicationSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/app/store";

function HomePage() {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.application.theme);
  const setTheme = (newTheme: string) => dispatch(changeTheme(newTheme));

  return (
    <div className={theme}>
      <div className="background ">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
    </div>
  );
}

export default HomePage;
