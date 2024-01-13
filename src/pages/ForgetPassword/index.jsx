import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail} from "firebase/auth"
import { auth } from '../../firebase/firebaseConfig';

import logoImg from '../../assets/cadastre-se.png'
import '../../pages/styles.css'
import Button from '../../components/Button';

function ForgetPassword() {
  const [email, setEmail] = useState("");
    
  const navigate = useNavigate();
    
  const handleReset = async () => {
    sendPasswordResetEmail(auth ,email)
    .then( 
      alert('Verifique seu e-mail'),
      navigate("/")
    )
    .catch(error => console.log(error));
  }
  
  
  return (
    <div className="container">
      <header className="header">
      <img src={logoImg} alt="cadastre-se" className="logoImg" />
        <span>Por favor digite seu E-mail</span>
      </header>

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

        <Button  handleClick={()=> handleReset()}>Enviar</Button>
    </div>

  )
}

export default ForgetPassword
