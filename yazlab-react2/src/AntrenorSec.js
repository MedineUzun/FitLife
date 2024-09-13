import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { firestore } from './firebaseApp';
import './Tablo.css';

function AntrenorSec() {
  const [users, setUsers] = useState([]);
  const [newData, setNewData] = useState({
    antrenörid: '',
    danisanid: '',
  });

  const handleAddData = async () => {
    try {
      const kullaniciantrenorCollection = collection(firestore, 'KullanıcıAntrenör');
      await addDoc(kullaniciantrenorCollection, newData);

      setNewData({
        antrenörid: '',
        danisanid: '',
      });
    } catch (error) {
      console.error('Veri eklenirken hata oluştu', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(firestore, 'Antrenör');
        const usersSnapshot = await getDocs(usersCollection);

        const userData = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          doğumtarihi: doc.data().doğumtarihi?.toDate().toLocaleDateString(),
        }));

        setUsers(userData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddData(); 
  };

  return (
    <div>
      <h2>Antrenörler</h2>
      <table>
      <thead>
              <tr>
                <th>ID</th>
                <th>Ad</th>
                <th>Soyad</th>
                <th>Cinsiyet</th>
                <th>Doğum Tarihi</th>
                <th>Uzmanlık Alanı</th>
                <th>Telefon Numarası</th>
    
              </tr>
            </thead>
      <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.isim}</td>
                  <td>{user.soyisim}</td>
                  <td>{user.cinsiyet}</td>
                  <td>{user.doğumtarihi}</td>
                  <td>{user.uzmanlıkalanı}</td>
                  <td>{user.telefonno}</td>
                </tr>
              ))}
              </tbody>
      </table>
      <br />
      <div>
        <p> Seçmek istediğiniz antrenörün ID'sini giriniz: </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="antrenörid"
            value={newData.antrenörid}
            onChange={(e) => handleInputChange(e)}
            placeholder="AntrenörID"
          />
          <p> Kendi ID'nizi giriniz: </p>
          <input
            type="text"
            name="danisanid"
            value={newData.danisanid}
            onChange={(e) => handleInputChange(e)}
            placeholder="ID'niz"
          />
          <button type="submit">
            Seç
          </button>
        </form>
      </div>
    </div>
  );
}

export default AntrenorSec;
