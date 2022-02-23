import { useState, ChangeEvent, HTMLInputTypeAttribute, useRef } from "react";
import "./style.css";

type Type = {
  onLogin: (email: string, password: string) => void;
};

export const LoginForm = ({ onLogin }: Type) => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const handleLogin = () => {
    if (inputEmail !== "" && inputPassword !== "") {
      onLogin(inputEmail, inputPassword);
    } else {
      console.log("erro");
    }
  };

  const handleInputEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setInputEmail(e.target.value);
  };
  const handleInputPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setInputPassword(e.target.value);
  };
  return (
    <form className="loginForm">
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

      <button
        className="add-button"
        type="submit"
        id="linkPage"
        onClick={handleLogin}
      >
        Efetuar Login
      </button>
    </form>
  );
};
