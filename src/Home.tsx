import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Home: React.FC = () => {
    const navigate = useNavigate();
    return (
        <>
            <Navbar />
            <div
                style={{
                    padding: 20,
                    paddingTop: 80, // для отступа под navbar
                    color: '#fff'
            }}
            >
                <h1>Добро пожаловать на главную страницу!</h1>
                <button onClick={() => navigate('/create-request')}>
                    Создать заявку
                </button>
            </div>
        </>
    );
};

export default Home;

