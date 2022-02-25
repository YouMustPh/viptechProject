import "./App.css";
import { Route, Routes } from "react-router-dom";
import { InitialPage } from "./pages/initialPage/initialPage";
import { Header } from "./coponents/header/header";
import { AddPage } from "./pages/addPage/addPage";
import { CartPage } from "./pages/cartPage/cartPage";
import { EditPage } from "./pages/editPage/editPage";
import { LoginPage } from "./pages/loginPage/loginPage";
import { RegisterPage } from "./pages/registerPage/registerPage";
import { Snackbar, Alert } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, putToken } from "./utilities/token";

function App() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [severity, setSeverity] = useState<any>("error");
  
  const navigate = useNavigate();

  const successAdd = (e: any) => {
    e
      ? (setOpen(true),
        setMessage("Produto adicionado com sucesso"),
        setSeverity("success"))
      : (setOpen(true),
        setMessage("Erro ao adicionar produto, tente novamente"),
        setSeverity("error"));
  };
 
  const successRegister = (e: any) => {
    e == "true"
      ? (setOpen(true),
        setMessage("Usuario cadastrado com sucesso"),
        setSeverity("success"))
      : (e == "falseEmail" ? (setOpen(true),
        setMessage("Email ja cadastrado"),
        setSeverity("error")) : (setOpen(true),
        setMessage("Erro ao realizar cadastro, tente novamente"),
        setSeverity("error") ));
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

  const logout = (e: any) => {
    e ? (navigate("/"), window.location.reload()) : "";
  };

  if (!getToken()) {
    return (
      <div>
        <Header onlogout={logout} />
        <Routes>
          <Route
            path="/"
            element={<LoginPage />}
          />
          <Route
            path="/register"
            element={<RegisterPage onConfirm={successRegister} />}
          />
        </Routes>

        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleClose}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      </div>
    );
  } else {
    return (
      <div>
        <Header onlogout={logout} />
        <Routes>
          <Route path="/" element={<InitialPage refresh={message} />} />
          <Route path="/addPage" element={<AddPage event={successAdd} />} />
          <Route path="/cartPage/:id" element={<CartPage />} />
          <Route path="/editPage/:id" element={<EditPage />} />
        </Routes>
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleClose}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

export default App;
