import React, {useState} from 'react';
import MyNavbar from './MyNavbar';
import Home from './Home';
import ChordRandomizer from "./ChordRandomizer";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import './swiper.css';
import { Navigation } from 'swiper/modules';

function App_be() {
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

export default App_be;