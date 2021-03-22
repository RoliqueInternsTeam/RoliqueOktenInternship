import './App.css';
import React from "react";
import Login from "./Components/Login/Login";
import Message from "./Components/Elements/Message/Message";
import Toggle from "./Components/Elements/Toggle/Toggle";
import Checkbox from "./Components/Elements/Checkbox/Checkbox";

function App() {
    // const successStyle=['success-bg-color', 'success-icon-color', 'success-text-color'];
    // const warningStyle=['warning-bg-color', 'warning-icon-color', 'warning-text-color'];
    // const errorStyle=['error-bg-color', 'error-icon-color', 'error-text-color'];
    // const infoStyle=['info-bg-color', 'info-icon-color', 'info-text-color'];

  return (
    <div>
     {/*<Login/>*/}
     <Checkbox/>
     <Toggle/>
    </div>
  );
}

export default App;
