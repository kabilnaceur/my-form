import "../../styles/main.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/app/store";
import styles from "./previewPage.module.scss";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import formBackground from "../../assets/images/formBackground.webp";
import FormElement from "./components/FormElement";
import { useLocation } from "react-router-dom";
import { Form } from "../../utils/types";

function PreviewPage() {
  const location = useLocation();
  const locationState = location.state as Form;

  const theme = useSelector((state: RootState) => state.application.theme);
  const optionsSelect = (element: any) =>
    element.options?.map((option: string) => {
      return `<option value="${option}">${option}</option>`;
    });
  const inputJs = locationState.elements.map((element) => {
    return `
        var ${element.name.replace(" ", "")} = document..getElementById('${
      element.id
    }');
      if( ${element.name.replace(" ", "")} = document..getElementById('${
      element.id
    } || ${element.isRequired} &&  ${element.name.replace(" ", "")}.value == "")
    console.log("this is a required element)
    `;
  });
  const inputStyle = locationState.elements.map((element) => {
    return `
      #${element.id} {
        font-size:${element.style.fontSize + "px"};
        border : 2px solide ${element.style.borderColor};
        color : ${element.style.color};
        background-color:${element.style.backgroud};
          border-radius:${element.style.borderRadius + "px"} ;
          ${element.type === "select" ? "padding:10px;" : ""}
      }
      #${element.id}-label {
  font-size: 18px;
  display: flex;
  width: 100%;
  padding: 10px 0px;
        ${
          element.type === "button"
            ? `display: flex;
 justify-content: center;
 align-items: center;`
            : ""
        }
      }
    `;
  });
  const cssCode = `
 
form input {
      padding: 10px;
}
.form-name {
font-size:33px;
text-align: center;
}
.form-description {
font-size:18px;
text-align: center;
}
    ${inputStyle.join("")}
`;
  const jsCode = `
function checkFormValidation() {
      ${inputJs.join("")}
}
`;
  const inputForms = locationState.elements.map((element) => {
    return `
    ${
      element.type === "select"
        ? `<select id="${element.id}">
  <option value="${element.name}">${element.name}</option>
  ${optionsSelect(element).join("")}
</select>
`
        : `  <label
        id="${element.id}-label"
      style={
        flex-direction:
         ${
           element.type === "checkbox" || element.type === "radio"
             ? "row"
             : "column"
         };
      }
    >
      ${element.type === "button" ? "" : element.name}
    <input
        id="${element.id}"
        name="${element.name.replace(" ", "")}"
        placeholder="${element.name}"
        type="${element.type}"
       />
       </label>`
    }
       `;
  });

  const codeString = `
    <form id="${locationState.name.replace(" ", "")}" >
       <h3 class = "form-name">${locationState.name}</h3>
       <p class = "form-description">${locationState.description}</p>
    ${inputForms.join("")}
    </form>
  `;
  return (
    <div className={theme}>
      <div className="background ">
        <div className={`${styles.previewContainer} ${styles[theme]}`}>
          <div className={styles.pageTitle}>
            <h4>Preview</h4>
          </div>
          <div className={styles.codeDiv}>
            <div className={styles.htmlCode}>
              <div className={styles.codeHeader}>HTML</div>
              <SyntaxHighlighter
                language="html"
                style={theme === "dark" ? atomDark : prism}
                customStyle={{ background: "none", height: "220px" }}
              >
                {codeString}
              </SyntaxHighlighter>
            </div>
            <div className={styles.cssCode}>
              <div className={styles.codeHeader}>CSS</div>
              <SyntaxHighlighter
                language="css"
                style={theme === "dark" ? atomDark : prism}
                customStyle={{ background: "none", height: "220px" }}
              >
                {cssCode}
              </SyntaxHighlighter>
            </div>
            <div className={styles.jsCode}>
              <div className={styles.codeHeader}>JS</div>
              <SyntaxHighlighter
                language="javascript"
                style={theme === "dark" ? atomDark : prism}
                customStyle={{ background: "none", height: "220px" }}
              >
                {jsCode}
              </SyntaxHighlighter>
            </div>
          </div>
          <div className={styles.formContentDiv}>
            <img alt="form-backgroud" src={formBackground} />
            <FormElement form={locationState} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewPage;
