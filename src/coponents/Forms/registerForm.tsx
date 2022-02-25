import { useState, ChangeEvent, useEffect } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert, CircularProgress } from "@mui/material";

type Type = {
  onRegister: (name: string, email: string, password: string) => void;
};

export const RegisterForm = ({ onRegister }: Type) => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputConfirmPassword, setInputConfirmPassword] = useState("");
  const [inputName, setInputName] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [truth, setTruth] = useState(false);

  const navigate = useNavigate();

  function timeout(delay: number) {
    return new Promise((res) => {
      setTimeout(res, delay);
    });
  }

  useEffect(() => {
    let warning: any = document.getElementById("warning");
    inputConfirmPassword === inputPassword
      ? ((warning.style.display = "none"), setTruth(false))
      : ((warning.style.display = "block"), setTruth(true));
  }, [inputConfirmPassword]);


  const handleInputEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setInputEmail(e.target.value);
  };
  const handleInputPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setInputPassword(e.target.value);
  };
  const handleInputConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setInputConfirmPassword(e.target.value);
  };
  const handleInputName = (e: ChangeEvent<HTMLInputElement>) => {
    setInputName(e.target.value);
  };

  const handleCreateUser = () => {
    if (
      inputEmail !== "" &&
      inputPassword !== "" &&
      inputPassword === inputConfirmPassword &&
      inputName !== ""
    ) {
      onRegister(inputName, inputEmail, inputConfirmPassword);
      navigate("/");
    } else {
      console.log("erro");
    }
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      {loading ? (
        <div className="circularProgress">
          <CircularProgress />
        </div>
      ) : (
        <form className="loginForm">
          <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              Dados incorretos
            </Alert>
          </Snackbar>
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
          <br />
          <fieldset className="loginCard">
            <legend>Confirme sua Senha</legend>
            <input
              placeholder="Reescreva sua senha"
              id="senha"
              type="password"
              required
              value={inputConfirmPassword}
              onChange={handleInputConfirmPassword}
            ></input>
          </fieldset>
          <div id="warning">Senhas não conferem</div>
          <button
            className="add-button"
            type={
              inputPassword === inputConfirmPassword ? "submit" : "button"}
            id="linkPage"
            onClick={handleCreateUser}
          >
            Efetuar Cadastro
          </button>
        </form>
      )}
    </div>
  );
};
