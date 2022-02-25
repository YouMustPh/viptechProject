import "./style.css";
import { getToken, removeToken } from "../../utilities/token";
import { api } from "../../api";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { CloseIcon } from "@chakra-ui/icons";
import { IconButton } from "@mui/material";

type Type = {
  onlogout: (e: any) => void;
};

export const Header = (props: Type) => {
  const [user, setUser] = useState<any>({});

  const User = async () => {};

  useEffect(() => {
    User();
  }, []);

  const handleLogout = () => {
    removeToken();

    props.onlogout(true);
  };

  const getProfile = async () => {
    let token: any = getToken();
    let decoded: any = jwt_decode(token);
    let user = await api.getUserId(decoded.id);
    let btn = document.getElementById("btnProfile");
    let profile: any = document.getElementById("profile");

    if (btn) {
      btn.style.display = "none";
      profile.style.display = "block";
    }
    setUser(user);
  };

  const appear = () => {
    let btn = document.getElementById("btnProfile");
    let profile: any = document.getElementById("profile");

    if (btn) {
      btn.style.display = "block";
      profile.style.display = "none";
    }
  };

  if (getToken()) {
    return (
      <div className="header">
        <header>
          <div className="login">
            <button id="btnProfile" className="btnIP" onClick={getProfile}>
              Perfil
            </button>
            <div className="profile" id="profile">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.3em",
                }}
              >
                <div>
                  <h3>Usuario</h3>
                  <p>{user.name}</p>
                </div>
                
                <IconButton
                  id="icon"
                  aria-label="delete"
                  color="primary"
                  onClick={appear}
                >
                  <CloseIcon />
                </IconButton>
              </div>
              <div>
                <h3>Email</h3>
                <p>{user.email}</p>
              </div>
            </div>
          </div>
          <div className="img">
            <img src="src/logo.svg" alt="logo" />
          </div>
          <div className="logout">
            <button className="btnIP" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>
      </div>
    );
  } else {
    return (
      <div className="header">
        <header>
          <div className="img">
            <img src="src/logo.svg" alt="logo" />
          </div>
        </header>
      </div>
    );
  }
};
