import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import MyChord from "./MyChord";


const chord_am = {
    frets: [4, -1, 2, 4, 3, -1],
    fingers: [3, 0, 1, 4, 2, 0],
    capo: false,
};

const chord_c = {
    frets: [4, -1, 2, 4, 4, -1],
    fingers: [2, -1, 1, 3, 4, -1],
    capo: false,
};

function App() {
    const [currentChord, setCurrentChord] = useState(chord_am);

    const handleRandomChord = () => {
        setCurrentChord(Math.random() < 0.5 ? chord_am : chord_c);
    };

    return (
        <React.StrictMode>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <MyChord chord={currentChord} name={currentChord === chord_am ? 'Am' : 'C'} />
                <button onClick={handleRandomChord}>Random Chord</button>
            </div>
        </React.StrictMode>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
