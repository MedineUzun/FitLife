import React from 'react';
import { useNavigate } from 'react-router-dom';

import './YoneticiSayfa2.css';

const YoneticiGiris = (props) => {
  const navigate = useNavigate();

  const yeniHesapClick = () => {
    navigate('/YoneticiGiris/YeniHesap');
  };

  const hesapEtkinlestirClick = () => {
    navigate('/YoneticiGiris/HesapEtkinlik2');
  };

  const hesapDevreDisiClick = () => {
    navigate('/YoneticiGiris/HesapEtkinlik1');
  };

  const danisanHesapBilgileriClick = () => {
    navigate('/YoneticiGiris/DanisanGoruntule');
  };

  const antrenorHesapBilgileriClick = () => {
    navigate('/YoneticiGiris/AntrenorGoruntule');
  };

  return (
    <div className="page-container">
      <div className="container">
        <h1 >HOŞ GELDİNİZ</h1>
      <button className="btn-green" onClick={yeniHesapClick}>
        Yeni Hesap Oluştur
      </button>
      <br />
      <br />
      <button className="btn-blue" onClick={hesapEtkinlestirClick}>
        Hesap etkinleştir
      </button>
      <br />
      <br />
      <button className="btn-red" onClick={hesapDevreDisiClick}>
        Hesap Devre Dışı Bırak
      </button>
      <br />
      <br />
      <button className="btn-orange" onClick={danisanHesapBilgileriClick}>
        Danışan Bilgilerini Görüntüle
      </button>
      <br />
      <br />
      <button className="btn-purple" onClick={antrenorHesapBilgileriClick}>
        Antrenör Bilgilerini Görüntüle
      </button>
      <br />
      <br />
    </div>
    </div>
  );
};

export default YoneticiGiris;
