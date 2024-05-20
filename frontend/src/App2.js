import React from 'react'
import CheckboxComponent from "./CheckboxComponent";
import App_be from './MyChord';
import App3 from './App3';

function App2() {
  const [showComponentB, setShowComponentB] = React.useState(false);

  const handleCheckboxChange = (isChecked) => {
    setShowComponentB(isChecked);
  };

  return (
      <div className="App">
        <CheckboxComponent onChange={handleCheckboxChange} />
        {showComponentB && <App />}
        {!showComponentB && <App3 />}
      </div>
  );
}

export default App2;