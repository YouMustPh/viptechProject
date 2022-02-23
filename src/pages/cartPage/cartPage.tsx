import "../style.css";
import { Link } from "react-router-dom";
import { CartForm } from "../../coponents/Forms/cartForm";

export const CartPage = () => {
  return (
    <div>
      <div className="menu">
        <Link to="/">Home &gt; &nbsp;</Link>Comprar Produto
      </div>
      <CartForm />
    </div>
  );
};
