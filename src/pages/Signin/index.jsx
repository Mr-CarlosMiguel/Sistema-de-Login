/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import api from "../../services/api";


export function App () {
  
  useEffect(() => {
  
    api  
      .post('https://mid.multtv.tv.br/apps/login', {
          user: 123,
          senha: 123,
          opid: 1
        }).then((response) => {
          console.log(response)
          if (response.data.status === 'ok') {
    
            var token = response.data.token;
            localStorage.setItem("token", token);
            window.location.href = "./home"
            
          }
        })
      })
  }

const Signin = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();


  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email | !senha) {
      setError("Preencha todos os campos");
      return;
    } 
  
    const res = signin(email, senha);

    if (res) {
      setError(res);
      return;
    }
  
    navigate("/home");
  };
    

  return (
    <C.Container>
      <C.Label>FAÇA SEU LOGIN</C.Label>
      <C.Content>
        <Input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />
        <Input
          type="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => [setSenha(e.target.value), setError("")]}
        />
        <C.labelError>{error}</C.labelError>
        <Button Text="Entrar" onClick={()=>handleLogin()} />
        <C.LabelSignup>
          Não tem uma conta?
          <C.Strong>
            <Link to="/signup">&nbsp;Registre-se</Link>
          </C.Strong>
        </C.LabelSignup>
      </C.Content>
    </C.Container>
  );
};

export default Signin;
