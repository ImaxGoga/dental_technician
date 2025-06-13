// About.tsx
import React from 'react';
import Navbar from './Navbar';

const About: React.FC = () => (
    <>
        <Navbar />
        <div
            style={{
                padding: 20,
                paddingTop: 80,
                color: '#fff'
            }}
        >
            <h1>Контакты</h1>
            <p>Контакты нашей компании...</p>
        </div>
    </>
);

export default About;
