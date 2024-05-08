import React from 'react'
import ReactDOM from 'react-dom'
import './MyChord.css';

import Chord from '@tombatossals/react-chords/lib/Chord';

const App3 = () => {

  const chord = {
    frets: [1, 1, 2, 2, 0, 1],
    fingers: [0, 1, 3, 2, 0, 0],
    capo: false,
  }
  const instrument = {
    strings: 6,
    fretsOnChord: 4,
    name: 'Guitar',
    keys: [],
    tunings: {
      standard: ['E', 'A', 'D', 'G', 'B', 'E']
    }
  }
  chord.fingers.reverse()
  chord.frets.reverse()

  const lite = false // defaults to false if omitted
  return (
      <div className="chord-container">
      <Chord
          chord={chord}
          instrument={instrument}
          lite={lite}
      />
      </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <App3 />
);

export default App3;