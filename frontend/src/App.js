import React, {useState} from 'react';
import MyNavbar from './MyNavbar';
import Home from './Home';
import ChordRandomizer from "./ChordRandomizer";

function App() {
    const [activePage, setActivePage] = useState('home');

    const handleNavigation = (pageName) => {
        setActivePage(pageName);
    };

    let content;
    switch (activePage) {
        case 'home':
            content = <Home/>;
            break;
        case 'personal-single-chords':
            content = <ChordRandomizer/>;
            break;
        default:
            content = <Home/>;
    }

    return (
        <div className="App">
            <MyNavbar onNavigationClick={handleNavigation}/>
            {content}
        </div>
    );
}

export default App;