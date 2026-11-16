import React from 'react';

export function ServerPage() {
    return (
        <>
            <section>
                <h2>Szerver Információk</h2>
                <p>Unalmas a rengeteg minigame, a céltalan bolyongás?</p>
                <p>Gyere és játssz nálunk!</p>
                <p>Szerverünkön kettő játékmód létezik: a túlélő és a nehéz!</p>
                <p>Ne habozz, csatlakozz hozzánk! Nálunk nem fogsz unatkozni!</p>
            </section>
            <section>
                <h2>Regisztráció</h2>
                <p>Itt tudsz regisztrálni a szerverünkre!</p>
                <ol type="number">
                    <li>Nyisd meg a Minecraft játékot.</li>
                    <li>Kattints a "Multiplayer" gombra.</li>
                    <li>Kattints az "Add Server" gombra.</li>
                    <li>Írd be a szerver címét: <strong>play.diehardmc.com</strong></li>
                    <li>Kattints a "Done" gombra.</li>
                    <li>Válaszd ki a szervert a listából, majd kattints a "Join Server" gombra.</li>
                    <li>A belépés után nyisd meg a chatet, majd regisztrálj a /register username password parancs segítségével! A username és password helyettesítendő a saját felhasználóneveddel és jelszavadddal.</li>
                    <li>Ha már regisztráltál, a /login username password parancs segítségével tudsz bejelentkezni. A username és password helyettesítendő a saját felhasználóneveddel és jelszavadddal.</li>
                    <li>Élvezd a játékot!</li>
                </ol>
            </section>
        </>
    );
}