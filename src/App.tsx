import Navbar from "./components/navbar/Navbar";
import FirstPage from "./pages/firstPage/FirstPage";
import GenerateFormPage from "./pages/generateFormPage/GenerateFormPage";
import HomePage from "./pages/homePage/HomePage";
import PreviewPage from "./pages/previewPage/PreviewPage";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./redux/app/store";

function App() {
  const forms = useSelector((state: RootState) => state.forms.forms);

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            forms.length > 0 ? (
              <Navigate to="/home" />
            ) : (
              <Navigate to="/get-started" />
            )
          }
        />
        <Route path="/home" element={<HomePage />} />
        <Route path="/preview" element={<PreviewPage />} />
        <Route path="/generate-form" element={<GenerateFormPage />} />
        <Route path="/get-started" element={<FirstPage />} />
      </Routes>{" "}
    </>
  );
}

export default App;
