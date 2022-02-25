import { RegisterForm } from "../../coponents/Forms/registerForm";
import { Link } from "react-router-dom";
import { api } from "../../api";


type Type = {
  onConfirm: (confirm: boolean) => void;
};

export const RegisterPage = ({ onConfirm }: Type) => {
  
  const addUser = async (name: string, email: string, password: string) => {
    try {
      const userCreated = await api.addUser(name, email, password);
      onConfirm(true);
    } catch (error) {
      console.log(error);
      onConfirm(false);
    }
  };

  return (
    <div>
      <br />

      <div className="loginBody">
        <h1>Realizar Cadastro</h1>
        <RegisterForm onRegister={addUser} />
        <div className="registermenu">
          <Link to="/">Já possui um cadastro?</Link>
        </div>
      </div>
    </div>
  );
};
