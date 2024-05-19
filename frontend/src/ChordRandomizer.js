import React, {useState, useRef} from 'react';
import ReactDOM from 'react-dom/client';
import MyChord from "./MyChord";
import Checkbox from '@mui/material/Checkbox';
import {FormControlLabel, FormGroup} from "@mui/material";

function ChordRandomizer() {
    const [chord1, setChord1] = useState(null);
    const [countdown, setCountdown] = useState(20);
    const [selectedKeys, setSelectedKeys] = useState(["C", "D", "E", "F", "G", "A", "B"]);
    const [selectedSuffixes, setSelectedSuffixes] = useState(["major", "minor", "maj7", "m7"]);
    useRef(null);

    const fetchChordWithParams = async () => {
        setCountdown(20); // Reset countdown

        try {
            const response = await fetch('http://localhost:10201/chord', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({keys: selectedKeys, suffixes: selectedSuffixes})
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return {
                name: data.name,
                frets: data.frets.map(Number),
                fingers: data.fingers.map(Number),
                capo: false,
                baseFret: data.baseFret,
                barres: data.barres.map(Number)
            };

        } catch (error) {
            console.error('Error fetching chord:', error);
        }
    };

    const fetchPersonalChord = async () => {
        setCountdown(20); // Reset countdown

        try {
            const response = await fetch('http://localhost:10201/chords/personal', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return {
                name: data.name,
                frets: data.frets.map(Number),
                fingers: data.fingers.map(Number),
                capo: false,
                baseFret: data.baseFret,
                barres: data.barres.map(Number)
            };

        } catch (error) {
            console.error('Error fetching chord:', error);
        }
    };

    const fetchAndSetChord = async () => {
        const newChord1 = await fetchPersonalChord();
        if (newChord1) {
            setChord1(newChord1);
        }
    };
    const handleRandomChord = () => {
        fetchAndSetChord();
    };

    const handleKeysCheckboxChange = (key) => (event) => {
        setSelectedKeys(prevKeys =>
            event.target.checked ? [...prevKeys, key] : prevKeys.filter(k => k !== key)
        );
    };
    const handleSuffixCheckboxChange = (key) => (event) => {
        setSelectedSuffixes(prevKeys =>
            event.target.checked ? [...prevKeys, key] : prevKeys.filter(k => k !== key)
        );
    };

    return (
        <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
            {chord1 ? (
                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                    <FormGroup>
                        {["C", "D", "E", "F", "G", "A", "B"].map(key => (
                            <FormControlLabel
                                key={key}
                                control={<Checkbox checked={selectedKeys.includes(key)}
                                                   onChange={handleKeysCheckboxChange(key)}/>}
                                label={key}
                            />
                        ))}
                    </FormGroup>
                    <FormGroup>
                        {["major", "minor", "maj7", "m7", "madd9", "m9"].map(type => (
                            <FormControlLabel
                                key={type}
                                control={<Checkbox checked={selectedSuffixes.includes(type)}
                                                   onChange={handleSuffixCheckboxChange(type)}/>}
                                label={type}
                            />
                        ))}
                    </FormGroup>
                    <MyChord chord={chord1} name={chord1.name}/>
                </div>
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

export default ChordRandomizer;