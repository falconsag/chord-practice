import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import MyChord from "./MyChord";

function App() {
    const [currentChord, setCurrentChord] = useState(null);
    const [chordName] = useState(null);

    const fetchChord = async () => {
        try {
            const response = await fetch('http://localhost:10201/chord');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const fullChord = {
                frets: data.frets.map(Number),
                fingers: data.fingers.map(Number),
                capo: false,
            };

            setCurrentChord(fullChord);
        } catch (error) {
            console.error('Error fetching chord:', error);
        }
    };

    useEffect(() => {
        fetchChord();
    }, []);

    const handleRandomChord = () => {
        fetchChord();
    };

    return (
        <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
            {currentChord ? (
                <MyChord chord={currentChord} name={""}/>
            ) : (
                <p>Loading chord...</p>
            )}
            <button onClick={handleRandomChord}>Random Chord</button>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);
