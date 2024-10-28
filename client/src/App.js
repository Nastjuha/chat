import { useState } from "react";
import "./App.css";
import Login from "./components/Login";

function App() {
  const [userName, setUserName] = useState("");

  return (
    <div className="main" id="wrapper">
      {userName ? "Chat" : <Login setUserName={setUserName} />}
    </div>
  );
}

export default App;
