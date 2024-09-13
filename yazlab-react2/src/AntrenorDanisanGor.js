import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from './firebaseApp'; 
import { useLocation } from 'react-router-dom';

const AntrenorDanisanGor = () => {
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
            
            const usersCollection = collection(firestore, 'DanışanAntrenör');
          const q = query(usersCollection, where('danisanid', '==', currentUser.id));

          const querySnapshot = await getDocs(q);
  
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
                <th>Cinsiyet</th>
                <th>Doğum Tarihi</th>
                <th>Uzmanlık Alanı</th>
                <th>E-posta</th>
                <th>Şifre</th>
              </tr>
            </thead>
            <tbody>
              <tr key={currentUser.id}>
                <td>{currentUser.id}</td>
                <td>{currentUser.isim}</td>
                <td>{currentUser.soyisim}</td>
                <td>{currentUser.cinsiyet}</td>
                <td>{currentUser.doğumtarihi?.toDate().toLocaleDateString()}</td>
                <td>{currentUser.uzmanlıkalanı}</td>
                <td>{currentUser.eposta}</td>
                <td>{currentUser.şifre}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p>Kullanıcı bilgileri bulunamadı.</p>
        )}
      </div>
    );
  };
export default AntrenorDanisanGor;
