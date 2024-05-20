import React from 'react'
import ReactDOM from 'react-dom'
import './MyChord.css';

import Chord from '@tombatossals/react-chords/lib/Chord';

const MyChord = ({chord}) => {

    const instrument = {
        strings: 6,
        fretsOnChord: 4,
        name: 'Guitar',
        keys: [],
        tunings: {
            standard: ['E', 'A', 'D', 'G', 'B', 'E']
        }
    }
    const lite = false // defaults to false if omitted
    return (
        <div className="chord-container" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <p style={{margin: 0}}>{chord.name}</p>
            <Chord chord={chord} instrument={instrument} lite={lite}/>
        </div>
    )
}

export default MyChord;