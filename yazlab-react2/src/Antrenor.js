import React, { useState } from 'react';
import { getDocs, query, where, collection } from 'firebase/firestore';
import { firestore } from './firebaseApp';
import { useNavigate} from 'react-router-dom'; 
const Antrenor = () => {
  const [newData, setNewData] = useState({
    eposta: '',
    şifre: '',
  });

  const [error, setError] = useState(null); 
  const navigate = useNavigate(); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const girisYap = async (e) => {
    e.preventDefault();

    setError(null);
    const q = query(
      collection(firestore, 'Antrenör'),
      where('eposta', '==', newData.eposta),
      where('şifre', '==', newData.şifre)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.error('ŞİFRE YANLIŞ');
      setError('ŞİFRE YANLIŞ');
      return;
    }
    querySnapshot.forEach((doc) => {
    
      console.log(doc.id, ' => ', doc.data());
    });

    navigate(`/AntrenorGiris?eposta=${newData.eposta}&şifre=${newData.şifre}`);
  

  };
  return (
    <form onSubmit={girisYap}>
    <div className="login-container">
      <h1>ANTRENÖR GİRİŞ</h1>
      <br />
      <label>
        E-Posta:
        <input type="text" 
        name="eposta" 
        value={newData.eposta} 
        onChange={(e) => handleInputChange(e)} />
      </label>
      <br />
      <label>
        Şifre:
        <input type="password" 
        name="şifre" 
        value={newData.şifre} 
        onChange={(e) => handleInputChange(e)} />
      </label>
      <br />
      <br />
     
        <button type="submit">Giriş Yap</button>
    </div>
    </form>
  );
};

export default Antrenor;
