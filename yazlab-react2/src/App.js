import { BrowserRouter as Router, Routes, Route , Link } from 'react-router-dom';
import Yonetici from './Yonetici';
import AntrenorGiris from './AntrenorGiris';
import Antrenor from './Antrenor';
import Danisan from './Danisan';
import YoneticiGiris from './YoneticiGiris';
import DanisanGiris from './DanisanGiris';
import DanisanUye from './DanisanUye';
import DanisanSifre from './DanisanSifre';
import UyeEkle from './UyeEkle';
import HesapEtkinlik from './HesapEtkinlik';
import Table1 from './DanisanGoruntule';
import Table2 from './AntrenorGoruntule';
import AntrenorSec from './AntrenorSec';
import AntrenorDanisanGor from './AntrenorDanisanGor';

function Anasayfa()
{
  return (
    <div className="d-flex flex-column align-items-center" style={{ boxShadow: 'none', border: 'none', maxWidth: '400px', margin: 'auto' }}>
    <br />
    <h1 style={{ fontSize: '3em', textAlign: 'center' }}>FITLIFE-ONLINE HOŞGELDİNİZ</h1>
    <br />
    <Link className="btn btn-outline-success" to="/Yonetici" style={{ width: '200px', marginBottom: '10px' }}>YÖNETİCİ</Link>
    <Link className="btn btn-outline-danger" to="/Antrenor" style={{ width: '200px', marginBottom: '10px' }}>ANTRENÖR</Link>
    <Link className="btn btn-outline-warning" to="/Danisan" style={{ width: '200px', marginBottom: '10px' }}>DANIŞAN</Link>
</div>

  
  
  );
}

export default function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Anasayfa />} />
          <Route path="/Antrenor" element={<Antrenor />} />
          <Route path="/AntrenorGiris" element={<AntrenorGiris />} />
          <Route path="/Yonetici" element={<Yonetici />} />
          <Route path="/YoneticiGiris" element={<YoneticiGiris />} />
          <Route path="/Danisan" element={<Danisan />} />
          <Route path="/DanisanGiris" element={<DanisanGiris />} />
          <Route path="/DanisanUye" element={<DanisanUye />} />
          <Route path="/DanisanSifre" element={<DanisanSifre />} />
          <Route path="/YoneticiGiris/YeniHesap" element={<UyeEkle />} />
          <Route path="/YoneticiGiris/HesapEtkinlik1" element={<HesapEtkinlik.UyePasif />} />
          <Route path="/YoneticiGiris/HesapEtkinlik2" element={<HesapEtkinlik.UyeAktif />} />
          <Route path="/YoneticiGiris/DanisanGoruntule" element={<Table1 />} />
          <Route path="/YoneticiGiris/AntrenorGoruntule" element={<Table2 />} />
          <Route path="/AntrenorSec" element={<AntrenorSec/>} />
          <Route path="/AntrenorDanisanGor" element={<AntrenorDanisanGor/>} />
        </Routes>
      </Router>
    );
    
}

