import './App.css';
import React from "react";
import Toggle from "./Components/Elements/Toggle/Toggle";
import Checkbox from "./Components/Elements/Checkbox/Checkbox";
import Login from "./Components/Login/Login";
import Dropdown from "./Components/Elements/Dropdown/Dropdown";
import Input from "./Components/Elements/Input/Input";
import Tooltip from "./Components/Elements/Tooltip/Tooltip";

function App() {

  return (
    <div>
        {/*<Dropdown name='Agency' label='Agency' options={['agency', 'option2', 'option3']}/>*/}
        <Tooltip arrowPlace='bottom' align='left' color='light'
                 message='Tooltip message will show up here'
        />
    </div>
  );
}

export default App;
