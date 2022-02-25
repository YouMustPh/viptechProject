import { useState, ChangeEvent, HTMLInputTypeAttribute, useRef } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

type Type = {
  onRegister: (name: string, email: string, password: string) => void;
};

export const RegisterForm = ({ onRegister }: Type) => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputName, setInputName] = useState("");

  const navigate = useNavigate()

  const handleInputEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setInputEmail(e.target.value);
  };
  const handleInputPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setInputPassword(e.target.value);
  };
  const handleInputName = (e: ChangeEvent<HTMLInputElement>) => {
    setInputName(e.target.value);
  };

  const handleCreateUser = () => {
    if (inputEmail !== "" && inputPassword !== "" && inputName !== "") {
      onRegister(inputName, inputEmail, inputPassword);
      navigate("/")
    } else {
      console.log("erro");
    }
  };

  return (
    <form className="loginForm">
      
      <fieldset className="loginCard">
        <legend>Nome</legend>
        <input
          placeholder="Digite seu nome"
          id="name"
          type="text"
          required
          value={inputName}
          onChange={handleInputName}
        ></input>
      </fieldset>
      <br />

      <fieldset className="loginCard">
        <legend>E-mail</legend>
        <input
          placeholder="Digite seu Email"
          id="email"
          type="email"
          required
          value={inputEmail}
          onChange={handleInputEmail}
        ></input>
      </fieldset>
      <br />
      <fieldset className="loginCard">
        <legend>Senha</legend>
        <input
          placeholder="Digite sua senha"
          id="senha"
          type="password"
          required
          value={inputPassword}
          onChange={handleInputPassword}
        ></input>
      </fieldset>
      {/* <br /> */}
      {/* <fieldset className="loginCard">
        <legend>Confirme sua Senha</legend>
        <input
          placeholder="Reescreva sua senha"
          id="senha"
          type="password"
          required
        //   value={inputPassword}
        //   onChange={handleInputPassword}
        ></input>
      </fieldset> */}
      <button
        className="add-button"
        type="submit"
        id="linkPage"
        onClick={handleCreateUser}
      >
        Efetuar Cadastro
      </button>
    </form>
  );
};
