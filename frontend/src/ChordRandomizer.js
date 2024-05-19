import React, {useState, useRef} from 'react';
import ReactDOM from 'react-dom/client';
import MyChord from "./MyChord";
import Checkbox from '@mui/material/Checkbox';
import {FormControlLabel, FormGroup} from "@mui/material";

function ChordRandomizer() {
    const [chord, setChord] = useState(null);
    const [countdown, setCountdown] = useState(20);
    const [selectedKeys, setSelectedKeys] = useState(["C", "D", "E", "F", "G", "A", "B"]);
    const [selectedSuffixes, setSelectedSuffixes] = useState(["major", "minor", "maj7", "m7"]);
    const [chordCounter, setChordCounter] = useState(0);
    useRef(null);
    const fetchChordsToPractice = async () => {
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
            return data.map(item => ({
                name: item.name,
                frets: item.frets.map(Number),
                fingers: item.fingers.map(Number),
                capo: false,
                baseFret: item.baseFret,
                barres: item.barres.map(Number)
            }));
        } catch (error) {
            console.error('Error fetching chord:', error);
        }
    };

    const fetchAndSetChord = async () => {
        const chords = await fetchChordsToPractice();
        if (chords) {
            setChordCounter(0)
            setChord(chords);
        }
    };
    const handleRandomChord = () => {
        fetchAndSetChord();
    };

    const handleNextChord = () => {
        setChordCounter(prevCounter => (prevCounter + 1) % chord.length);
    }


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
            {chord ? (
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
                    <MyChord chord={chord[chordCounter]} name={chord[chordCounter].name}/>
                </div>
            ) : (
                <p>Loading chord...</p>
            )}
            <div>
                <button onClick={handleRandomChord}>Restart</button>
                <button onClick={handleNextChord}>Next Chord</button>
                <p>Changing in: {countdown}</p> {}
            </div>
        </div>
    );
}

export default ChordRandomizer;