import { LoginForm } from "../../coponents/Forms/loginForm";
import { Link } from "react-router-dom";
import { api } from "../../api";
import { Snackbar, Alert, Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import { putToken } from "../../utilities/token";

type Type = {
  setToken: (token: any) => void;
};

export const LoginPage = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  function timeout(delay: number) {
    return new Promise((res) => {
      setTimeout(res, delay);
    });
  }

  const login = async (email: string, password: string) => {
    setLoading(true);

    timeout(1500).then(async () => {
      try {
        await api.login(email, password);
        setLoading(true);
        window.location.reload();
      } catch (error) {
        setLoading(false);
        console.log(error);
        setOpen(true);
      }
    });
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
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              Usuario ou senha incorretos, tente novamente
            </Alert>
          </Snackbar>
        </div>
      )}
    </div>
  );
};
