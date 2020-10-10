import React from 'react';
import Common from "./Common";
import team from '../images/team.png';

const About = () => {
    return (
        <Common
            name="Let's meet our amazing team"
            imgsrc={team}
            visit="/contact"
            btname="Contact Now"
        />
    );
};

export default About;