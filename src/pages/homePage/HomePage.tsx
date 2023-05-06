import "../../styles/main.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/app/store";

function HomePage() {
  const theme = useSelector((state: RootState) => state.application.theme);

  return (
    <div className={theme}>
      <div className="background "></div>
    </div>
  );
}

export default HomePage;
