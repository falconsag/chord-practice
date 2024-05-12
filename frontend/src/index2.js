import React, {useState} from 'react';
import './index.css';
import MyChord from "./MyChord";
import Button from '@mui/material/Button';
import ReactDOM from 'react-dom/client';


const chordAm = {
    frets: [4, -1, 2, 4, 3, -1],
    fingers: [3, 0, 1, 4, 2, 0],
    capo: false,
};

const chordC = {
    frets: [4, -1, 2, 4, 4, -1],
    fingers: [2, -1, 1, 3, 4, -1],
    capo: false,
};

function App() {
    const [currentChord, setCurrentChord] = useState(chordAm);

    const handleRandomChord = () => {
        setCurrentChord(Math.random() < 0.5 ? chordAm : chordC);
    };

    return (
        <React.StrictMode>
            <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
                <MyChord chord={currentChord} name={currentChord === chordAm ? 'Am' : 'C'}/>
                <Button variant="contained" onClick={handleRandomChord}>
                    Random Chord
                </Button>
            </div>
        </React.StrictMode>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
