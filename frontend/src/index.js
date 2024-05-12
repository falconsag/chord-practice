import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import MyChord from "./MyChord";

function App() {
    const [currentChord, setCurrentChord] = useState(null);
    const [countdown, setCountdown] = useState(3);
    const countdownRef = useRef(null); // Ref to hold the interval ID

    const fetchChord = async () => {
        setCountdown(3); // Reset countdown

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
        fetchChord(); // Initial fetch

        const intervalId = setInterval(() => {
            fetchChord();
        }, 3000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (countdown === 0) {
            // When the countdown hits 0, clear the interval to stop it
            clearInterval(countdownRef.current);
        } else {
            // Start or restart the countdown interval
            countdownRef.current = setInterval(() => {
                setCountdown(prevCountdown => prevCountdown - 1);
            }, 1000); // Decrease by 1 every second
        }

        return () => clearInterval(countdownRef.current); // Clean up interval on unmount or when countdown reaches 0
    }, [countdown]);

    const handleRandomChord = () => {
        fetchChord();
    };

    return (
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {currentChord ? (
                <MyChord chord={currentChord} name={""} />
            ) : (
                <p>Loading chord...</p>
            )}
            <div>
                <button onClick={handleRandomChord}>Next Chord</button>
                <p>Changing in: {countdown}</p> {/* Display the countdown */}
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
