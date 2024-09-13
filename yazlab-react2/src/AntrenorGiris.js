import React, { useState, useEffect } from 'react';
import { getDocs, query, where, collection } from 'firebase/firestore';
import { firestore } from './firebaseApp';
import { updateDoc, addDoc } from 'firebase/firestore';
import { useLocation } from 'react-router-dom';

const AntrenorGiris = (props) => {
    const [currentUser, setCurrentUser] = useState(null);
    const location = useLocation();
  
    useEffect(() => {
      const fetchUser = async () => {
        const params = new URLSearchParams(location.search);
        const eposta = params.get('eposta');
        const sifre = params.get('şifre');
  
        try {
        
          const usersCollection = collection(firestore, 'Antrenör');
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
          setCurrentUser(null);
        }
      };

      
      fetchUser();
        
    }, [location.search]);

    const [newData, setNewData] = useState({
      isim: '',
      soyisim: '',
      deneyimler: '',
      telefonno: '',
      uzmanlıkalanı: '',
      eposta:'',
      şifre:''
       
      });
      const handleInputChange = (e, setData) => {
        const { name, value } = e.target;
        setData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
      const handleGuncelleClick = async () => {
        try {
          const q = query(collection(firestore, 'Antrenör'), where('eposta', '==', newData.eposta));
          const querySnapshot = await getDocs(q);
    
          if (querySnapshot.size > 0) {
            querySnapshot.forEach((doc) => {
            updateDoc(doc.ref, newData);
            });
            console.log('Veri başarıyla güncellendi');
          } else {
            const antrenorCollection = collection(firestore, 'Antrenör');
            await addDoc(antrenorCollection, newData);
            console.log('Veri başarıyla eklendi');
          }
    
         
        } catch (error) {
          console.error('Veri eklenirken veya güncellenirken hata oluştu', error);
        }
      };

return (
    <div>
      <h2>Antrenör Bilgileri</h2>
      {currentUser ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>İsim</th>
              <th>Soyisim</th>
             
              <th>Uzmanlık Alanı</th>
              <th>Deneyimler</th>
              <th>Telefon No</th>
              <th>Cinsiyet</th>
              
              <th>E-posta</th>
              <th>Şifre</th>
            </tr>
          </thead>
          <tbody>
            <tr key={currentUser.id}>
              <td>{currentUser.id}</td>
              <td>{currentUser.isim}</td>
              <td>{currentUser.soyisim}</td>
              <td>{currentUser.uzmanlıkalanı}</td>
              <td>{currentUser.deneyimler}</td>
              <td>{currentUser.telefonno}</td>
              <td>{currentUser.cinsiyet}</td>
             
              <td>{currentUser.eposta}</td>
              <td>{currentUser.şifre}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Kullanıcı bilgileri bulunamadı.</p>
      )}
    <br/>
    <br/>

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
        <label htmlFor="deneyimler">Deneyimler:</label>
        <input type="text" id="deneyimler" name="deneyimler" value={newData.deneyimler} onChange={(e) => handleInputChange(e, setNewData)} />
      </div>

      <div>
        <label htmlFor="telefonno">Telefon No:</label>
        <input type="text" id="telefonno" name="telefonno" value={newData.telefonno} onChange={(e) => handleInputChange(e, setNewData)} />
      </div>

      <div>
        <label htmlFor="uzmanlıkalanı">Uzmanlık Alanı:</label>
        <input type="text" id="uzmanlıkalanı" name="uzmanlıkalanı" value={newData.uzmanlıkalanı} onChange={(e) => handleInputChange(e, setNewData)} />
      </div>
      <div>
        <label htmlFor="eposta">E posta:</label>
        <input type="text" id="eposta" name="eposta" value={newData.eposta} onChange={(e) => handleInputChange(e, setNewData)} />
      </div>
      <div>
        <label htmlFor="şifre">Şifre:</label>
        <input type="text" id="şifre" name="şifre" value={newData.şifre} onChange={(e) => handleInputChange(e, setNewData)} />
      </div>

      <button type="button" onClick={handleGuncelleClick}>
        GÜNCELLE
      </button>
    </form>

    </div>


)};








export default AntrenorGiris;