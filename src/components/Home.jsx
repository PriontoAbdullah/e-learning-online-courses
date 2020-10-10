import React from 'react';
import Common from './Common';
import headerImg from '../images/header-img.png';

const Home = () => {
    return (
        <Common
             name="Improve your skills with"
             imgsrc={headerImg}
             visit="/courses"
             btname="Get Started"
        />
   );
};

export default Home;
