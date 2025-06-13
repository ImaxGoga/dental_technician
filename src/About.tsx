import React from 'react';
import Navbar from './Navbar';

const About: React.FC = () => (
    <>
        <Navbar />
        <div
            style={{
                padding: 20,
                paddingTop: 80, // для отступа под navbar
                color: '#fff'
            }}
        >
            <h1>О фирме</h1>
            <p>Информация о нашей компании...</p>
        </div>
    </>
);

export default About;
