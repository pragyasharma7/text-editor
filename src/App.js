
import { useState } from "react";
import "./App.css";
function App() {
   const [text, setText] = useState("");
  const [insertText, setInsertText] = useState("");
  const [cursorPosition, setCursorPosition] = useState(0);
  const [history, setHistory] = useState([{ text: "", cursorPosition: 0 }]);

  const handleInsert = (char) => {
    const newText =
      text.slice(0, cursorPosition) + char + text.slice(cursorPosition);
    setText(newText);
    setCursorPosition(cursorPosition + 1);
    setHistory([
      ...history,
      { text: newText, cursorPosition: cursorPosition + 1 },
    ]);
    setInsertText("");
  };

  const handleUndo = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      const lastEntry = newHistory[newHistory.length - 1];
      setText(lastEntry.text);
      setCursorPosition(lastEntry.cursorPosition);
      setHistory(newHistory);
    }
  };

  const handleDelete = () => {
    if (cursorPosition > 0) {
      const newText =
        text.slice(0, cursorPosition - 1) + text.slice(cursorPosition);
      setText(newText);
      setCursorPosition(cursorPosition - 1);
      setHistory([
        ...history,
        { text: newText, cursorPosition: cursorPosition - 1 },
      ]);
    }
  };

  const handleMoveCursorLeft = () => {
    if (cursorPosition > 0) {
      setCursorPosition(cursorPosition - 1);
    }
  };

  const handleMoveCursorRight = () => {
    if (cursorPosition < text.length) {
      setCursorPosition(cursorPosition + 1);
    }
  };

  return (
    <div className="wrapper">
      <h5 className="label">Text editor</h5>
      <textarea
        className="textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Backspace" && handleDelete()}
      ></textarea>
      <div className="insert__wrapper">
        <input
          type="text"
          className="input__field"
          value={insertText}
          onChange={(e) => setInsertText(e.target.value)}
        />
      </div>
      <div className="buttons__wrapper">
        <button
          className="button"
          onClick={() => handleInsert(insertText)}
        >
          Insert
        </button>
        <button
          className="button"
          onClick={() => handleUndo()}
        >
          Undo
        </button>
        <button
          className="button"
          onClick={() => handleMoveCursorLeft()}
        >
          Left
        </button>
        <button
          className="button"
          onClick={() => handleMoveCursorRight()}
        >
          Right
        </button>
      </div>
    </div>
  );
}

export default App;
