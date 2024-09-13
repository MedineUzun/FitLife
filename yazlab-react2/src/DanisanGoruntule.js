import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from './firebaseApp';
import './Tablo.css';

function Table1() {
  const [users, setUsers] = useState([]);
 
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(firestore, 'Kullanıcı');
        const usersSnapshot = await getDocs(usersCollection);

        const userData = [];
        usersSnapshot.forEach((doc) => {
          const user = {
            id: doc.id,
            ...doc.data(),
          };


          userData.push(user);
        });

        setUsers(userData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Kullanıcılar</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>İsim</th>
            <th>Soyisim</th>
            <th>Cinsiyet</th>
            <th>Doğum Tarihi</th>
            <th>E-posta</th>
            <th>Etkileşim Durumu</th>
            <th>Profil Fotoğrafı</th>
            <th>Telefon Numarası</th>
            <th>Şifre</th>
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
              <td>{user.eposta}</td>
              <td>{user.etkileşimdurumu}</td>
              <td>{user.profilfoto}</td>
              <td>{user.telefonno}</td>
              <td>{user.şifre}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table1;
