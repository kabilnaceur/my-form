import "../../styles/main.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/app/store";
import styles from "./previewPage.module.scss";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import formBackground from "../../assets/images/formBackground.webp";
import Form from "./components/Form";

function PreviewPage() {
  const theme = useSelector((state: RootState) => state.application.theme);
  const cssCode = `.dark {
  color: $white;
  background-color: $dark-700;
}
.previewContainer {
  padding: 100px 50px;
  display: flex;
  height: 100vh;
  flex-direction: column;
}`;
  const jsCode = `
let messagesLength = 0
let userClicked = ""
let inputMessage = document.getElementById("input-message");
let typingBlock = document.getElementById("typing-block-message");
const emoji = document.querySelector("emoji-picker")
const messageContent = document.getElementById("messagesContent");
const chatContent = document.getElementById("chat-content");
`;
  const codeString = `
    <html>
      <head>
        <title>Hello World</title>
      </head>
      <body>
        <h1>Hello World!</h1>
      </body>
    </html>
  `;
  return (
    <div className={theme}>
      <div className="background ">
        <div className={`${styles.previewContainer} ${styles[theme]}`}>
          <div className={styles.codeDiv}>
            <div className={styles.htmlCode}>
              <div className={styles.codeHeader}>HTML</div>
              <SyntaxHighlighter
                language="html"
                style={theme === "dark" ? atomDark : prism}
                customStyle={{ background: "none", height: "270px" }}
              >
                {codeString}
              </SyntaxHighlighter>
            </div>
            <div className={styles.cssCode}>
              <div className={styles.codeHeader}>CSS</div>
              <SyntaxHighlighter
                language="css"
                style={theme === "dark" ? atomDark : prism}
                customStyle={{ background: "none", height: "270px" }}
              >
                {cssCode}
              </SyntaxHighlighter>
            </div>
            <div className={styles.jsCode}>
              <div className={styles.codeHeader}>JS</div>
              <SyntaxHighlighter
                language="javascript"
                style={theme === "dark" ? atomDark : prism}
                customStyle={{ background: "none" }}
              >
                {jsCode}
              </SyntaxHighlighter>
            </div>
          </div>
          <div className={styles.formContentDiv}>
            <img alt="form-backgroud" src={formBackground} />
            <Form />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewPage;
