
import React from 'react';
import './DanisanUyeSayfa.css';
import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from './firebaseApp';

export const DanisanUye = (props) => {
  const [newData, setNewData] = useState({
    isim: '',
    soyisim: '',
    cinsiyet: '',
    doğumtarihi: '',
    eposta: '',
    telefonno: '',
    şifre: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
 
  const handleEkleClick = async () => {
    try {
      const kullaniciCollection = collection(firestore, 'Kullanıcı');
      await addDoc(kullaniciCollection, newData);
      setNewData({
        isim: '',
        soyisim: '',
        cinsiyet: '',
        doğumtarihi: '',
        eposta: '',
        telefonno: '',
        şifre: '',
      });
      console.log('Veri başarıyla eklendi');
    } catch (error) {
      console.error('Veri eklenirken hata oluştu', error);
    }
  };

  return (
    <form>
      <div className="mb-3">
        <h2 className="mb-4">ÜYE OL</h2>

        <label htmlFor="firstName" className="form-label">
          Adınız:
        </label>
        <input
          type="text"
          className="form-control"
          id="firstName"
          name="isim"
          value={newData.isim}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="lastName" className="form-label">
          Soyadınız:
        </label>
        <input
          type="text"
          className="form-control"
          id="lastName"
          name="soyisim"
          value={newData.soyisim}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Cinsiyet:</label>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="cinsiyet"
            id="male"
            value="Erkek"
            checked={newData.cinsiyet === 'Erkek'}
            onChange={handleInputChange}
            required
          />
          <label className="form-check-label" htmlFor="male">
            Erkek
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="cinsiyet"
            id="female"
            value="Kadın"
            checked={newData.cinsiyet === 'Kadın'}
            onChange={handleInputChange}
            required
          />
          <label className="form-check-label" htmlFor="female">
            Kadın
          </label>
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="dogumtarihi" className="form-label">
          Doğum Tarihi:
        </label>
        <input
          type="date"
          className="form-control"
          id="dogumtarihi"
          name="doğumtarihi"
          value={newData.doğumtarihi}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="eposta" className="form-label">
          E-posta:
        </label>
        <input
          type="email"
          className="form-control"
          id="eposta"
          name="eposta"
          value={newData.eposta}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="telefonno" className="form-label">
          Telefon Numaranız:
        </label>
        <input
          type="tel"
          className="form-control"
          id="telefonno"
          name="telefonno"
          value={newData.telefonno}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="sifre" className="form-label">
          Şifre:
        </label>
        <input
          type="password"
          className="form-control"
          id="sifre"
          name="şifre"
          value={newData.şifre}
          onChange={handleInputChange}
          required
        />
      </div>

      <button type="button" onClick={handleEkleClick}>
        EKLE
      </button>
    </form>
  );
};  export default DanisanUye;