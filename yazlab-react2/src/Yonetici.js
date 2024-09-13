import './GirisSayfa.css';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const Yonetici = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    
    const adminUsername = '1';
    const adminPassword = '123';

    if (username === adminUsername && password === adminPassword) {

      console.log('Giriş başarılı!');
      navigate('/YoneticiGiris');
    } else {
     
      console.log('Kullanıcı adı veya şifre hatalı.');
    }
  };

  return (
    <div className="login-container">
      <h1>YÖNETİCİ GİRİŞ</h1>
      <br />
      <label>
        Kullanıcı Adı:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="username-input"
        />
      </label>
      <br />
      <label>
        Şifre:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="password-input"
        />
      </label>
      <br />
      <br />
      <button onClick={handleLogin}>Giriş Yap</button>
    </div>
  
  );
};

export default Yonetici;
