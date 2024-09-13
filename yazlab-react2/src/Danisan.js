import './DanisanGirisSayfa.css'; 
import React, { useState } from 'react';
import { getDocs, query, where, collection } from 'firebase/firestore';
import { firestore } from './firebaseApp';
import { useNavigate, Link } from 'react-router-dom'; 



const Danisan = () => {
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
      collection(firestore, 'Kullanıcı'),
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

    navigate(`/DanisanGiris?eposta=${newData.eposta}&şifre=${newData.şifre}`);

  };
  

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <form onSubmit={girisYap}>
        <h1>DANIŞAN GİRİŞ</h1>
        <label>
          Eposta:
          <input type="text" name="eposta" value={newData.eposta} onChange={(e) => handleInputChange(e)} />
        </label>
        <br/>
        <label>
          Şifre:
          <input type="password" name="şifre" value={newData.şifre} onChange={(e) => handleInputChange(e)} />
        </label>
        <br/>
        <br />
        <button type="submit">Giriş Yap</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <br />
        <br />
        <Link to="/DanisanSifre">
          <button>Şifremi Unuttum</button>
        </Link>
        <br/>
        <br />
        <Link to="/DanisanUye">
          <button>Üye Ol</button>
        </Link>
      </form>
    </div>
  );
};

export default Danisan;
