import { LoginForm } from "../../coponents/Forms/loginForm";
import { Link, Navigate } from "react-router-dom";
import { api } from "../../api";
import { useEffect, useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
type Type = {
  setToken: (token: any) => void;
};

export const LoginPage = (props: Type) => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const login = async (email: string, password: string) => {
    try {
      const token = await api.login(email, password);
      props.setToken(token)
      // navigate("/initialPage")
    } catch (error) {
      console.log(error);
      setOpen(true);
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
      <br />
      <div className="loginBody">
        <h1>Realizar Login</h1>
        <LoginForm onLogin={login} />
        <div className="registermenu">
          <Link to="/register">Não possui um cadastro?</Link>
        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          'Usuario ou senha incorretos, tente novamente'
        </Alert>
      </Snackbar>
    </div>
  );
};
