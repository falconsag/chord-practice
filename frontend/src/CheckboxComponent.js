import React from 'react'
import App from "./MyChord";

function CheckboxComponent({onChange}) {
    const [isChecked, setIsChecked] = React.useState(false);

    const handleChange = (event) => {
        setIsChecked(event.target.checked);
        onChange(event.target.checked);
    };

    return (
        <div>
            <label>
                <input type="checkbox" checked={isChecked} onChange={handleChange}/>
                Show Component B
            </label>
        </div>
    );
}

export default CheckboxComponent;