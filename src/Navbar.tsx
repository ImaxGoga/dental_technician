import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
    const baseLinkStyle: React.CSSProperties = {
        color: '#FF9900',
        textDecoration: 'none',
        fontWeight: 600,
        fontSize: 17,
        padding: '10px 18px',
        borderRadius: 8,
        transition: 'background 0.3s, color 0.3s',
        letterSpacing: 1,
    };

    return (
        <nav style={styles.nav}>
            <div style={styles.leftBlock}>
                <img src="/src/img/logo.png" alt="Логотип портала" style={{ height: 64 }} />
                <ul style={styles.ul}>
                    {[
                        { to: '/', label: 'Главная', end: true },
                        { to: '/about', label: 'О фирме' },
                        { to: '/works', label: 'Наши работы' },
                        { to: '/create-request', label: 'Создать заявку' },
                        { to: '/contacts', label: 'Контакты' },
                    ].map(({ to, label, end }) => (
                        <li key={to}>
                            <NavLink
                                to={to}
                                end={end}
                                style={({ isActive }) => ({
                                    ...baseLinkStyle,
                                    background: isActive
                                        ? 'linear-gradient(90deg, #FF9900 0%, #B3B3B3 100%)'
                                        : 'none',
                                    color: isActive ? '#181A20' : '#FF9900',
                                    boxShadow: isActive ? '0 2px 12px 0 #FF990088' : 'none',
                                })}
                            >
                                {label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

const styles: Record<string, React.CSSProperties> = {
    nav: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        background: 'linear-gradient(90deg, #181A20 70%, #1F2633 100%)',
        boxShadow: '0 2px 8px #000c',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        height: 72,
        padding: '0 40px',
    },
    leftBlock: {
        display: 'flex',
        alignItems: 'center',
        gap: 24, // расстояние между логотипом и меню
        width: '100%',
    },
    logo: {
        height: 48,
        borderRadius: 12,
        boxShadow: '0 0 12px #FF990044',
        background: '#222',
    },
    ul: {
        listStyle: 'none',
        display: 'flex',
        gap: 16,
        margin: 0,
        padding: 0,
        alignItems: 'center',
    },
};

export default Navbar;
