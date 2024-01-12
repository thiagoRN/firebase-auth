/* eslint-disable react-hooks/exhaustive-deps */
import { signOut } from "firebase/auth";
import { auth } from '../../firebase/firebaseConfig';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {   collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

import '../../pages/styles.css'

function Home() {
  const navigate = useNavigate();
  const [storageData, setStorageData] = useState("");
  const collectionRef = collection(db, "userInfo")
  
  
  useEffect(() => {
    const storage = onSnapshot(collectionRef, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // eslint-disable-next-line no-cond-assign
        if(doc.data().email = auth.currentUser.email) setStorageData(doc.data().displayName); 
      });
    });
    return () => {
      storage();
    };
  }, []);

  const handleClick = () =>{
    signOut(auth).then(()=>{
        console.log("Deslogou")
        navigate('/')
    })
}
  return (
    <>
    <nav style={{
        height: 38,
        
        backgroundColor:'#4763E4',
        display: 'flex',
        alignItems: 'center',
        justifyContent:'end',
    }}>
    <button style={{
              width: 90,
              height: 30,
              display: 'flex',
              backgroundColor:'white',
              color: '#4763E4',
              alignItems: 'center',
              justifyContent:'center',
              margin:20,
              }} 
                onClick={handleClick}>
              Deslogar
        </button>
    </nav>
     <div className="container">
    
            <h1>Bem vindo, {storageData}!!</h1>
            
    </div>
    </>
  )
}

export default Home