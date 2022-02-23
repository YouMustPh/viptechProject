import "../style.css";
import { Link } from "react-router-dom";
import { AddForm } from "../../coponents/Forms/addForm";
import { api } from "../../api";

type Type = {
  event: (e: boolean) => void;
};

export const AddPage = ({ event }: Type) => {
  const addProduct = async (
    name: string,
    brand: string,
    price: number,
    color: string,
    src: any,
    createDate: any
  ) => {
    try {
      await api.addProduct(name, brand, price, color, src, createDate);
      event(true);
    } catch (error) {
      console.log(error);
      event(false);
    }
  };

  return (
    <div>
      <div className="menu">
        <Link to="/">Home &gt; &nbsp;</Link>
        Adicionar Produto
      </div>
      <div className="body">
        <h1>Adicionar Produto</h1>
        <AddForm onAdd={addProduct} />
      </div>
    </div>
  );
};
