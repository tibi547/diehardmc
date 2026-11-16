import React, { useState } from "react";

export function RegistrationPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password !== passwordConfirm) {
            alert("A jelszavak nem egyeznek!");
            return;
        }
        
        try {
            const response = await fetch('http://127.0.0.1:5000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });

            const data = await response.json();
            
            if (response.ok) {
                alert(data.message || "Sikeres regisztráció!");
            } else {
                alert(`Hiba: ${data.message || "Ismeretlen hiba történt"}`);
            }
        } catch (error) {
            console.error("Hálózati hiba a regisztráció során:", error);
            alert("Nem sikerült kapcsolódni a szerverhez.");
        }
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h2>Regisztráció</h2>
                <p>Kérjük, töltse ki az alábbi űrlapot a regisztrációhoz:</p>
                <div className="input-group">
                    <label htmlFor="username">Felhasználónév:</label>
                    <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Jelszó:</label>
                    <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="input-group">
                    <label htmlFor="password-confirm">Jelszó megerősítése:</label>
                    <input type="password" id="password-confirm" name="passwordConfirm" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} required />
                </div>
                <button type="submit">Regisztráció</button>
            </form>
        </div>
    );
}