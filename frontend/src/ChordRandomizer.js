import React, {useState, useRef, useEffect} from 'react';
import MyChord from './MyChord';
import Checkbox from '@mui/material/Checkbox';
import {FormControlLabel, FormGroup} from '@mui/material';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Pagination, Navigation, Mousewheel} from 'swiper/modules';
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const timeout = 5;

function ChordRandomizer() {
    const settings = {
        dots: true,
        infinite: false,
        speed: 0,
        slidesToShow: 1,
        slidesToScroll: 1,
        focusOnSelect: true,
    };
    const swiperRef = useRef(null);
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
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideNext();
        }
    };

    useEffect(() => {
        if (chord) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }

            intervalRef.current = setInterval(() => {
                setCountdown(prevCountdown => {
                    if (prevCountdown < 1) {
                        handleNextChord();
                        return timeout;
                    }
                    return prevCountdown - 1;
                });
            }, 1000);

            return () => {clearInterval(intervalRef.current);
                console.log("timer cleared")

            } // Clear interval on component unmount
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

            <Swiper
                ref={swiperRef}
                pagination={{
                    type: 'progressbar',
                }}
                mousewheel={true}
                navigation={true}
                modules={[Pagination, Navigation, Mousewheel]}
                className="mySwiper"
            >
                {chord ? (
                    Array.from({length: 5}, (_, index) => (
                        <SwiperSlide key={index}>
                            <MyChord chord={chord[(chordCounter + index) % chord.length]}/>
                        </SwiperSlide>
                    ))
                ) : (
                    <div>
                        <p>Loading chord...</p>
                    </div>
                )}
            </Swiper>
        </div>
    );
}

export default ChordRandomizer