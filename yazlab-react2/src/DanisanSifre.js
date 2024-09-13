
import './GirisSayfa.css';
import React, { useState } from 'react';
import { getDocs, query, where, collection, updateDoc, doc } from 'firebase/firestore';
import { firestore } from './firebaseApp'; 
export const DanisanSifre = (props) => {
    const [newData, setNewData] = useState({
        eposta: '',
        yenişifre: '',
        tekrarşifre: '',
      });
    
      const handleInputChange = (e, setData) => {
        const { name, value } = e.target;
        setData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (newData.yenişifre !== newData.tekrarşifre) {
          console.error('Şifreler eşleşmiyor.');
          return;
        }

        const q = query(collection(firestore, 'Kullanıcı'), where('eposta', '==', newData.eposta));
        const querySnapshot = await getDocs(q);
    
        if (querySnapshot.docs.length === 0) {
          console.error('Kullanıcı bulunamadı.');
          return;
        }
 
        const userDoc = querySnapshot.docs[0];
        await updateDoc(doc(firestore, 'Kullanıcı', userDoc.id), {
          şifre: newData.yenişifre,
        });
    
        console.log('Şifre güncellendi!');

        setNewData({
          eposta: '',
          yenişifre: '',
          tekrarşifre: '',
        });
      };
    return (
        <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="eposta">E-posta:</label>
          <input
            type="email"
            id="eposta"
            name="eposta"
            value={newData.eposta}
            onChange={(e) => handleInputChange(e, setNewData)}
            required
          />
        </div>
        <div>
          <label htmlFor="yenişifre">Yeni Şifre:</label>
          <input
            type="password"
            id="yenişifre"
            name="yenişifre"
            value={newData.yenişifre}
            onChange={(e) => handleInputChange(e, setNewData)}
            required
          />
        </div>
        <div>
          <label htmlFor="tekrarşifre">Yeni Şifre (Tekrar):</label>
          <input
            type="password"
            id="tekrarşifre"
            name="tekrarşifre"
            value={newData.tekrarşifre}
            onChange={(e) => handleInputChange(e, setNewData)}
            required
          />
        </div>
        <button type="submit">Şifreyi Sıfırla</button>
      </form>
    );
}; export default DanisanSifre;