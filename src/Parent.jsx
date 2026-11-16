import React, { useState, useEffect } from 'react';
import { HomePage } from './HomePage';
import { ServerPage } from './ServerPage';
import { ContactPage } from './ContactPage';
import { RegistrationPage } from './RegistrationPage';
import { ContentPage } from './ContentPage';
import { LoginPage } from './LoginPage';

export function Parent() {
    const [section, setSection] = useState('home');
    // State a bejelentkezett állapot nyomon követésére
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

    // Ha változik a section (pl. sikeres login után átváltunk), frissítjük az állapotot is
    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem('token'));
    }, [section]);

    const handleSectionChange = (newSection) => {
        setSection(newSection);
    };

    const handleLogout = async () => {
    const token = localStorage.getItem('token');

    // Ha valamiért nincs token, ne is hívjuk a backendet, csak töröljük a helyi állapotot
    if (!token) {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setSection('home');
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:5000/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            localStorage.removeItem('token');
            setIsLoggedIn(false);
            alert("Sikeres kijelentkezés!");
            setSection('home');
        } else {
            // Ha lejárt vagy hibás a token, akkor is takarítsunk ki lokálisan
            localStorage.removeItem('token');
            setIsLoggedIn(false);
            setSection('home');
            alert("A munkamenet lejárt vagy érvénytelen volt.");
        }
    } catch (error) {
        console.error("Hálózati hiba:", error);
    }
};

    const renderMainContent = () => {
        switch (section) {
            case 'home':
                return <HomePage />;
            case 'server':
                return <ServerPage />;
            case 'contact':
                return <ContactPage />;
            case 'registration':
                return <RegistrationPage />;
            case 'login':
                // Átadhatjuk a setSection-t vagy egy callbacket a LoginPage-nek, hogy bejelentkezés után frissítsen
                return <LoginPage onLoginSuccess={() => { setIsLoggedIn(true); setSection('content'); }} />;
            case 'content':
                return <ContentPage />;
            default:
                return <HomePage />;
        }
    };

    return (
        <>
            <header>
                <h1>Főoldal</h1>
                <p>Üdvözöljük a DieHardMC weboldalán!</p>
                <section>
                    <img src="https://cdn.discordapp.com/attachments/112345678901" alt="DieHardMC" />
                </section>
            </header>
            <nav>
                <ul>
                    <li>
                        <a onClick={() => handleSectionChange('home')}>Főoldal</a>
                    </li>
                    <li>
                        <a onClick={() => handleSectionChange('registration')}>Regisztráció</a>
                    </li>
                    <li>
                        {isLoggedIn ? (
                            <a onClick={() => handleSectionChange('content')}>Tartalom</a>
                        ) : (
                            <a onClick={() => handleSectionChange('login')}>Bejelentkezés</a>
                        )}
                    </li>
                    <li>
                        {isLoggedIn && <a onClick={handleLogout}>Kijelentkezés</a>}
                    </li>
                    <li>
                        <a onClick={() => handleSectionChange('server')}>Szerver</a>
                    </li>
                    <li>
                        <a onClick={() => handleSectionChange('contact')}>Kapcsolat</a>
                    </li>
                </ul>
            </nav>
            <main>
                {renderMainContent()}
            </main>
            <footer>
                <p>&copy; 2024 DieHardMC. Minden jog fenntartva.</p>
            </footer>
        </>
    );
}