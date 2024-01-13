import { useState } from 'react';
import { Link } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import logoImg from '../../assets/cadastre-se.png'
import '../../pages/styles.css'
import Button from '../../components/Button';



function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const navigate = useNavigate();
    const auth = getAuth();
    
    
  function handleSignIn(e) {
    e.preventDefault();
    if (!email | !password) {
        alert("Preencha todos os campos");
        return;
      }

    signInWithEmailAndPassword(auth, email, password)
    .then( async() => {
        navigate("/home");
      })
      .catch((err) => {
        if(err.code === "auth/invalid-credential"){alert('Senha ou email incorretos');}
        else{alert(err.code);}
      });
  }

  function handleReset (){
    navigate("/reset");
  }

  return (
    <div className="container">
      <header className="header">
        <img src={logoImg} alt="cadastre-se" className="logoImg" />
        <span>Por favor digite suas informações de login</span>
      </header>

      <form>
        <div className="inputContainer">
          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Seu e-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="inputContainer">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="senha"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <a  href="#" onClick={handleReset}>Esqueceu sua senha ?</a>


        <Button  handleClick={handleSignIn}>Entrar</Button>

        <div className="footer">
          <p>Ainda não possui uma conta?</p>
          <Link to="/register" style={{fontWeight:500, textDecoration:'inherit', color: '#5C73DB'}}>Registre-se</Link>
        </div>
      </form>
    </div>
  )
}

export default Login
