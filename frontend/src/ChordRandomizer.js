import React, {useState, useRef, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import MyChord from './MyChord';
import Checkbox from '@mui/material/Checkbox';
import {FormControlLabel, FormGroup} from '@mui/material';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const timeout = 60;

function ChordRandomizer() {
    const settings = {
        dots: true,
        infinite: false,
        speed: 0,
        slidesToShow: 1,
        slidesToScroll:1,
        focusOnSelect: true,
    };
    const [chord, setChord] = useState(null);
    const [countdown, setCountdown] = useState(timeout);
    const [selectedKeys, setSelectedKeys] = useState(['C', 'D', 'E', 'F', 'G', 'A', 'B']);
    const [selectedSuffixes, setSelectedSuffixes] = useState(['major', 'minor', 'maj7', 'm7']);
    const [chordCounter, setChordCounter] = useState(0);
    const intervalRef = useRef(null);

    const fetchChordsToPractice = async () => {
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
            setChord(chords);
            setChordCounter(0);
            setCountdown(timeout);
        }
    };

    const handleNextChord = () => {
        setChordCounter(prevCounter => (prevCounter + 1) % chord.length);
    };

    useEffect(() => {
        if (chord) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }

            intervalRef.current = setInterval(() => {
                setCountdown(prevCountdown => {
                    if (prevCountdown <= 1) {
                        handleNextChord();
                        return timeout;
                    }
                    return prevCountdown - 1;
                });
            }, 1000);

            return () => clearInterval(intervalRef.current); // Clear interval on component unmount
        }
    }, [chord]);

    useEffect(() => {
        fetchAndSetChord();
    }, []);

    const handleKeysCheckboxChange = key => event => {
        setSelectedKeys(prevKeys =>
            event.target.checked ? [...prevKeys, key] : prevKeys.filter(k => k !== key)
        );
    };

    const handleSuffixCheckboxChange = key => event => {
        setSelectedSuffixes(prevKeys =>
            event.target.checked ? [...prevKeys, key] : prevKeys.filter(k => k !== key)
        );
    };

    return (
        <div>
            <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
                <FormGroup>
                    {['C', 'D', 'E', 'F', 'G', 'A', 'B'].map(key => (
                        <FormControlLabel
                            key={key}
                            control={
                                <Checkbox
                                    checked={selectedKeys.includes(key)}
                                    onChange={handleKeysCheckboxChange(key)}
                                />
                            }
                            label={key}
                        />
                    ))}
                </FormGroup>
                <FormGroup>
                    {['major', 'minor', 'maj7', 'm7', 'madd9', 'm9'].map(type => (
                        <FormControlLabel
                            key={type}
                            control={
                                <Checkbox
                                    checked={selectedSuffixes.includes(type)}
                                    onChange={handleSuffixCheckboxChange(type)}
                                />
                            }
                            label={type}
                        />
                    ))}
                </FormGroup>
                <div>
                    <button onClick={fetchAndSetChord}>Restart</button>
                    <button onClick={handleNextChord}>Next Chord</button>
                    <p>Changing in: {countdown}</p>
                </div>
            </div>
            <Slider {...settings} >
                {chord ? (
                    Array.from({ length: 2 }, (_, index) => (
                        <div key={index}>
                            <MyChord chord={chord[(chordCounter + index) % chord.length]} />
                        </div>
                    ))
                ) : (
                    <div>
                        <p>Loading chord...</p>
                    </div> // Single loading message
                )}
            </Slider>
        </div>
    );
}

export default ChordRandomizer