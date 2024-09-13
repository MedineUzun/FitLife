import React, { useState } from 'react';
import { firestore } from './firebaseApp';
import './UyeEkleSayfa.css';
import { getDocs, query, where, collection, updateDoc, doc } from 'firebase/firestore';

class HesapEtkinlik{
 static UyePasif = () => {
  const [newData, setNewData] = useState({
    eposta: '',
    etkileşimdurumu: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const q = query(collection(firestore, 'Kullanıcı'), where('eposta', '==', newData.eposta));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length === 0) {
      console.error('Kullanıcı bulunamadı.');
      return;
    }
    const userDoc = querySnapshot.docs[0];
    await updateDoc(doc(firestore, 'Kullanıcı', userDoc.id), {
      etkileşimdurumu : "PASİF",
    });

    console.log('blocklandı');
  };
 
  return (
    <form onSubmit={handleSubmit}>
      <div>
      <h2>Üyeyi Devre Dışı Bırak</h2>
      Pasifleştirmek istediğiniz üyenin e-postasını giriniz:
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
        <br />
        <button type="submit" >
          Pasifleştir
        </button>
      </form>
 
  );
};

 static UyeAktif = () => {
  const [newData, setNewData] = useState({
    eposta: '',
    etkileşimdurumu: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
 
    const q = query(collection(firestore, 'Kullanıcı'), where('eposta', '==', newData.eposta));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length === 0) {
      console.error('Kullanıcı bulunamadı.');
      return;
    }
    const userDoc = querySnapshot.docs[0];
    await updateDoc(doc(firestore, 'Kullanıcı', userDoc.id), {
      etkileşimdurumu : "AKTİF",
    });

  };
 
  return (
    <form onSubmit={handleSubmit}>
      <div>
      <h2>Üyeyi Aktifleştir</h2>
      Aktifleştirmek istediğiniz üyenin e-postasını giriniz:
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
        <br />
        <button type="submit" >
          Aktifleştir
        </button>
      </form>
 
  );
};
}


export default HesapEtkinlik;
