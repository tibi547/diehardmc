import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export function HomePage() { 
    const [news, setNews] = useState([]);
    const [onlinePlayers, setOnlinePlayers] = useState(0);
    const [registeredPlayers, setRegisteredPlayers] = useState(0);

    useEffect(() => {
        const fetchNews = async () => {
            const response = await fetch('http://127.0.0.1:5000/api/news');
            const data = await response.json();
            setNews(data);
        };

        const fetchPlayerCounts = async () => {
            const response = await fetch('http://127.0.0.1:5000/api/players');
            const data = await response.json();
            setOnlinePlayers(data.online);
            setRegisteredPlayers(data.registered);
        };

        fetchNews();
        fetchPlayerCounts();
    }, []);

    return (
        <>
            <section id="welcome">
                <h2>Üdvözöljük a DieHardMC weboldalán!</h2>
                <h2>Új játékos vagy?</h2>
                <p>
                    Ha új játékos vagy, kérjük, olvasd el a szerver oldalunkat, ahol megtalálod a csatlakozási információkat és a szabályokat.
                </p>
            </section>
            <section id="news">
                <h2>Hírek</h2>
                {news.length > 0 ? (
                    <div>
                        {news.map((item) => (
                            <p key={item.id}>{item.title}</p>
                        ))}
                    </div>
                ) : (
                    <p>Jelenleg nincs új hír.</p>
                )}
            </section>
            <section id="online_players">
                <h2>Online Játékosok</h2>
                <p>Jelenlegi online játékosok száma: {onlinePlayers || 'Szolgáltatás nem elérhető'}</p>
                <p>Regisztrált játékosok száma: {registeredPlayers || 'Szolgáltatás nem elérhető'}</p>
            </section>
        </>
    );
}
