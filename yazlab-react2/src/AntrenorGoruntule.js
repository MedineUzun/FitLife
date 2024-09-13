import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from './firebaseApp';
import './Tablo.css';

function Table2() {
  const [users, setUsers] = useState([]);
 
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(firestore, 'Antrenör');
        const usersSnapshot = await getDocs(usersCollection);

        const userData = [];
        usersSnapshot.forEach((doc) => {
          const user = {
            id: doc.id,
            ...doc.data(),
          };

          if (user.doğumtarihi) {
            user.doğumtarihi = user.doğumtarihi.toDate().toLocaleDateString();
          }

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
            <th>E-posta</th>
            <th>Şifre</th>
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
              <td>{user.eposta}</td>
              <td>{user.şifre}</td>
              <td>{user.telefonno}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table2;
