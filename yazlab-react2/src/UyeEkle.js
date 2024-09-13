import React, { useState } from 'react';
import { firestore, firebaseTimestamp } from './firebaseApp';
import './UyeEkleSayfa.css';
import { collection, addDoc } from 'firebase/firestore';

const UyeEkle = () => {
  const [newData, setNewData] = useState({
    isim: '',
    soyisim: '',
    cinsiyet: '', 
    eposta: '',
    etkileşimdurumu: '',
    profilfoto: '',
    telefonno: '',
    şifre: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCinsiyetChange = (e) => {
    const { value } = e.target;
    setNewData((prevData) => ({
      ...prevData,
      cinsiyet: value,
    }));
  };

  const handleAddData = async () => {
    try {
      const kullaniciCollection = collection(firestore, 'Kullanıcı');
      await addDoc(kullaniciCollection, newData);
      setNewData({
        isim: '',
        soyisim: '',
        cinsiyet: '',
        eposta: '',
        etkileşimdurumu: '',
        profilfoto: '',
        telefonno: '',
        şifre: ''
      });
      console.log('Veri başarıyla eklendi');
    } catch (error) {
      console.error('Veri eklenirken hata oluştu', error);
    }
  };

  return (
    <div>
      <h2>Yeni Üye Ekle</h2>
      <form>
        <label>
          İsim:
          <input
            type="text"
            name="isim"
            value={newData.isim}
            onChange={handleInputChange}
          />
        </label>
        <br/>
        <label>
          Soyisim:
          <input
            type="text"
            name="soyisim"
            value={newData.soyisim}
            onChange={handleInputChange}
          />
        </label>
        <br/>
        <label>
          E-Posta:
          <input
            type="text"
            name="eposta"
            value={newData.eposta}
            onChange={handleInputChange}
          />
        </label>
        <br/>
        <label>
          Şifre:
          <input
            type="password"
            name="şifre"
            value={newData.şifre}
            onChange={handleInputChange}
          />
        </label>
        <br/>
       
        <label>
          Telefon Numarası:
          <input
            type="text"
            name="telefonno"
            value={newData.telefonno}
            onChange={handleInputChange}
          />
        </label> 
        <br/>
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
        <label>
          Cinsiyet:
          <label>
            Erkek
            <input
              type="radio"
              name="cinsiyet"
              value="Erkek"
              checked={newData.cinsiyet === 'Erkek'}
              onChange={handleCinsiyetChange}
            />
          </label>
          <label>
            Kadın
            <input
              type="radio"
              name="cinsiyet"
              value="Kadın"
              checked={newData.cinsiyet === 'Kadın'}
              onChange={handleCinsiyetChange}
            />
          </label>
        </label>

        <br/>
        <button type="button" onClick={handleAddData}>
          Veri Ekle
        </button>

      </form>
    </div>
  );
};

export default UyeEkle;
