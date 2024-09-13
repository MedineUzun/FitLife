import './DanisanGirisSayfa.css';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { getDocs, query, where, collection } from 'firebase/firestore';
import { firestore } from './firebaseApp';
import { updateDoc, addDoc } from 'firebase/firestore';
import { useLocation } from 'react-router-dom';

const DanisanGiris = (props) => {
  const [newData, setNewData] = useState({
    isim: '',
    soyisim: '',
    doğumtarihi: '',
    cinsiyet: '',
    eposta: '',
    telefonno: '',
    şifre: ''
  });

  const [newData1, setNewData1] = useState({
    kilo: '',
    boy: '',
    kaskütlesi: '',
    vücutkitleindeksi: '',
    vücutyağoranı: '',
   
  });

  const [newData2, setNewData2] = useState({
    kilo: '',
    boy: '',
    kaskütlesi: '',
    vücutkitleindeksi: '',
    vücutyağoranı: '',
    şifre: ''
  });
  const [currentUser, setCurrentUser] = useState(null);
  const location = useLocation();
  useEffect(() => {
    const fetchUser = async () => {
      const params = new URLSearchParams(location.search);
      const eposta = params.get('eposta');
      const sifre = params.get('şifre');

      try {
        const usersCollection = collection(firestore, 'Kullanıcı');
        const q = query(usersCollection, where('eposta', '==', eposta), where('şifre', '==', sifre));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
      
          console.error('Kullanıcı bulunamadı.');
          
          setCurrentUser(null);
        } else {
        
          const userDoc = querySnapshot.docs[0];
          setCurrentUser({
            id: userDoc.id,
            ...userDoc.data(),
          });
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        
      }

    };

    fetchUser();
  }, [location.search]);
  
  const handleInputChange = (e, setData) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
const navigate = useNavigate();

const handleAntrenorSec= () => {
  navigate('/AntrenorSec');
};

 
  const handleGuncelleClick = async () => {
    try {
      const q = query(collection(firestore, 'Kullanıcı'), where('eposta', '==', newData.eposta));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.size > 0) {
        querySnapshot.forEach((doc) => {
          updateDoc(doc.ref, newData);
        });
        console.log('Veri başarıyla güncellendi');
      } else {
        const kullaniciCollection = collection(firestore, 'Kullanıcı');
        await addDoc(kullaniciCollection, newData);
        console.log('Veri başarıyla eklendi');
      }

      setNewData({
        isim: '',
        soyisim: '',
        doğumtarihi: '',
        cinsiyet: '',
        eposta: '',
        telefonno: '',
        şifre: '',
      });
    } catch (error) {
      console.error('Veri eklenirken veya güncellenirken hata oluştu', error);
    }
  };

  const handleIlerlemeGuncelleClick = async () => {
    try {
      const q = query(collection(firestore, 'İlerlemeKaydı'), where('şifre', '==', newData2.şifre));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.size > 0) {
        querySnapshot.forEach((doc) => {
          updateDoc(doc.ref, newData1);
        });
        console.log('İlerleme kaydı başarıyla güncellendi');
      } else {
        const ilerlemeKaydiCollection = collection(firestore, 'İlerlemeKaydı');
        await addDoc(ilerlemeKaydiCollection, newData1);
        console.log('İlerleme kaydı başarıyla eklendi');
      }

      setNewData1({
        kilo: '',
        boy: '',
        kaskütlesi: '',
        vücutkitleindeksi: '',
        vücutyağoranı: '',
      });
    } catch (error) {
      console.error('İlerleme kaydı eklenirken veya güncellenirken hata oluştu', error);
    }
  };

  const handleIlerlemeEkleClick = async () => {
    try {
      const ilerlemeKaydiCollection = collection(firestore, 'İlerlemeKaydı');
      await addDoc(ilerlemeKaydiCollection, newData2);
      setNewData2({
        kilo: '',
        boy: '',
        kaskütlesi: '',
        vücutkitleindeksi: '',
        vücutyağoranı: '',
      });
      console.log('Veri başarıyla eklendi');
    } catch (error) {
      console.error('Veri eklenirken hata oluştu', error);
    }
  };
 
  


  return (
    <div>
      <h2>KİŞİSEL BİLGİLERİNİZ</h2>
      
      {currentUser ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>İsim</th>
              <th>Soyisim</th>
              <th>Cinsiyet</th>
              <th>Doğum Tarihi</th>
              <th>E-posta</th>
              <th>Şifre</th>
              <th>Telefon Numarası</th>
            </tr>
          </thead>
          <tbody>
            <tr key={currentUser.id}>
              <td>{currentUser.id}</td>
              <td>{currentUser.isim}</td>
              <td>{currentUser.soyisim}</td>
              <td>{currentUser.cinsiyet}</td>
              <td>{currentUser.doğumtarihi}</td>
              <td>{currentUser.eposta}</td>
              <td>{currentUser.şifre}</td>
              <td>{currentUser.telefonno}</td>

            </tr>

          </tbody>
        </table>

      ) : (
        <p>Kullanıcı bilgileri bulunamadı.</p>
      )}


      <br />
      <br />
      <p>Antrenörlerimizi görüntülemek için tıklayınız.</p>
      <button type="button" onClick={handleAntrenorSec}>
          GÖRÜNTÜLE
        </button>
       <br />
      <br />
      <h2>GÜNCELLEMEK İSTEĞİNİZ BİLGİLERİ GİRİNİZ</h2>
      <form>
        <div>
          <label htmlFor="isim">İsim:</label>
          <input type="text" id="isim" name="isim" value={newData.isim} onChange={(e) => handleInputChange(e, setNewData)} />
        </div>

        <div>
          <label htmlFor="soyisim">Soyisim:</label>
          <input type="text" id="soyisim" name="soyisim" value={newData.soyisim} onChange={(e) => handleInputChange(e, setNewData)} />
        </div>

        <div>
          <label htmlFor="eposta">E-posta:</label>
          <input type="email" id="eposta" name="eposta" value={newData.eposta} onChange={(e) => handleInputChange(e, setNewData)} />
        </div>

        <div>
          <label htmlFor="telefon">Telefon Numarası:</label>
          <input type="text" id="telefonno" name="telefonno" value={newData.telefonno} onChange={(e) => handleInputChange(e, setNewData)} />
        </div>

        <div>
          <label htmlFor="sifre">Şifre:</label>
          <input type="password" id="sifre" name="şifre" value={newData.şifre} onChange={(e) => handleInputChange(e, setNewData)} />
        </div>

        <button type="button" onClick={handleGuncelleClick}>
          GÜNCELLE
        </button>
      </form>
      <h2>İLERLEME KAYITLARINIZI EKLEYİN</h2>
      <form>
        <label>
          Boy:
          <input
            type="number"
            name="boy"
            value={newData2.boy}
            onChange={(e) => handleInputChange(e, setNewData2)}
          />
        </label>
        <label>
          Kas Kütlesi:
          <input
            type="number"
            name="kaskütlesi"
            value={newData2.kaskütlesi}
            onChange={(e) => handleInputChange(e, setNewData2)}
          />
        </label>
        <label>
          Kilo:
          <input
            type="number"
            name="kilo"
            value={newData2.kilo}
            onChange={(e) => handleInputChange(e, setNewData2)}
          />
        </label>
        <label>
          Vücut Kitle İndeksi:
          <input
            type="number"
            name="vücutkitleindeksi"
            value={newData2.vücutkitleindeksi}
            onChange={(e) => handleInputChange(e, setNewData2)}
          />
        </label>
        <label>
          Vücut Yağ Oranı:
          <input
            type="number"
            name="vücutyağoranı"
            value={newData2.vücutyağoranı}
            onChange={(e) => handleInputChange(e, setNewData2)}
          />
        </label>
        <label>
         Şifrenizi Giriniz:
          <input
            type="password"
            name="şifre"
            value={newData2.şifre}
            onChange={(e) => handleInputChange(e, setNewData2)}
          />
        </label>
        <button type="button" onClick={handleIlerlemeEkleClick}>
          EKLE
        </button>
      </form>

      <h2>İLERLEME KAYITLARINI GÜNCELLEME</h2>
      <form>
        <div>
          <label htmlFor="boy">Boy:</label>
          <input type="number" id="boy" name="boy" value={newData1.boy} onChange={(e) => handleInputChange(e, setNewData1)} />
        </div>
        <div>
          <label htmlFor="kaskütlesi">Kas Kütlesi:</label>
          <input type="number" id="kaskütlesi" name="kaskütlesi" value={newData1.kaskütlesi} onChange={(e) => handleInputChange(e, setNewData1)} />
        </div>
        <div>
          <label htmlFor="kilo">Kilo:</label>
          <input type="number" id="kilo" name="kilo" value={newData1.kilo} onChange={(e) => handleInputChange(e, setNewData1)} />
        </div>
        <div>
          <label htmlFor="vücutkitleindeksi">Vücut Kitle İndeksi:</label>
          <input type="number" id="vücutkitleindeksi" name="vücutkitleindeksi" value={newData1.vücutkitleindeksi} onChange={(e) => handleInputChange(e, setNewData1)} />
        </div>
        <div>
          <label htmlFor="vücutyağoranı">Vücut Yağ Oranı:</label>
          <input type="number" id="vücutyağoranı" name="vücutyağoranı" value={newData1.vücutyağoranı} onChange={(e) => handleInputChange(e, setNewData1)} />
        </div>
        <label>
         Şifrenizi Giriniz:
          <input
            type="password"
            name="şifre"
            value={newData2.şifre}
            onChange={(e) => handleInputChange(e, setNewData2)}
          />
        </label>
        <button type="button" onClick={handleIlerlemeGuncelleClick}>
          GÜNCELLE
        </button>
      </form>
    </div>
  );
};


export default DanisanGiris;