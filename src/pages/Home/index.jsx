/* eslint-disable react-hooks/exhaustive-deps */
import { signOut } from "firebase/auth";
import { auth } from '../../firebase/firebaseConfig';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {   collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

import '../../pages/styles.css'
import Button from "../../components/Button";
import Footer from "../../components/Footer";

function Home() {
  const navigate = useNavigate();
  const [storageData, setStorageData] = useState("");
  const collectionRef = collection(db, "userInfo")
  
  
  useEffect(() => {
    const storage = onSnapshot(collectionRef, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // eslint-disable-next-line no-cond-assign

        let docEmail = doc.data().email.toLowerCase();
        let authEmail = auth.currentUser.email.toLowerCase();
        
        (docEmail == authEmail ? setStorageData(doc.data().displayName) : 'user')
         
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
    <div style={{display:'flex', flexFlow:'column', height:'100vh'}}>
    <nav style={{
        height: 38,
        backgroundColor:'#4763E4',
        display: 'flex',
        alignItems: 'center',
        justifyContent:'end',
    }}>
    <Button  
    width={90} 
    height={30}
    color={'#4763E4'}
    backgroundColor={'white'}
    margin={20}
    handleClick={handleClick}
    >
      Deslogar
    </Button>

    </nav>
     <div style={{
      display:'flex', 
      textAlign:'center',
      alignItems:'center', 
      justifyContent:'center',
      height:'100%',
      flexGrow:0,
    }}>
    
            <h1>Bem vindo, {storageData}!!</h1>
            
    </div>
    <Footer />
    </div>
  )
}

export default Home