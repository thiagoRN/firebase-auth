/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
import {  useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../../firebase/firebaseConfig";
import {  doc, setDoc, } from "firebase/firestore";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import logoImg from '../../assets/cadastre-se.png'
import '../../pages/styles.css'

function Register() {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  
  
  const navigate = useNavigate();
  const auth = getAuth();
  

  function handleSignUp(e) {
    e.preventDefault();
    if (!email | !password | !displayName) {
      alert("Preencha todos os campos");
      return;
    }
    
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (reg.test(email) === false) {
      alert('Por favor forneça um email válido');
      return;
    }

    if(password !== confirmedPassword){
      alert("Confirme a senha corretamente");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password,).then( async(data) => {
      try{
        const ref = doc(db, "userInfo", data.user.uid)
        const docRef = await setDoc(ref, { displayName, email })

        navigate("/");
      }catch (e) {
        console.error("Error adding document: ", e);
      }
      
    })
    .catch((err) => {
      if(err.code === "auth/email-already-in-use"){alert('email já existe');}
      else if(err.code === "auth/invalid-email"){alert('email invalido');}
      else if(err.code === "auth/weak-password"){alert('Senha muito fraca');}
      else{alert(err.code);}
      
    });
  }


  return (
    <div className="container">
    <header className="header">
      <img src={logoImg} alt="cadastre-se" className="logoImg" />
      <span>Por favor digite suas informações de cadastro</span>
    </header>

    <form>
      <div className="inputContainer">
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Digite seu e-mail"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="inputContainer">
        <input
          type="text"
          name="displayName"
          id="displayName"
          placeholder="Digite seu nome"
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </div>

      <div className="inputContainer">
        
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="inputContainer">
        
        <input
          type="password"
          name="confirmedpassword"
          id="confirmedpassword"
          placeholder="Confirmar Senha"
          onChange={(e) => setConfirmedPassword(e.target.value)}
        />
      </div>

      <button onClick={handleSignUp} className="button">
        Cadastrar 
      </button>
      <div className="footer">
        <p>Você já tem uma conta?</p>
        <Link to="/">Acesse sua conta aqui</Link>
      </div>
    </form>
  </div>
  )
}

export default Register
