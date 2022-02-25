import "../style.css";
import { Link } from "react-router-dom";
import { EditForm } from "../../coponents/Forms/editForm";
import { api } from "../../api";
import { useState } from "react";
import { CircularProgress } from "@mui/material";

export const EditPage = () => {
  const editProduct = async (
    id: any,
    name: string,
    brand: string,
    price: number,
    color: string,
    src: any
  ) => {
    await api.editProduct(id, name, brand, price, color, src);
  };

  return (
    <div>
      <div className="menu">
        <Link to="/">Home &gt; &nbsp;</Link>Editar Produto
      </div>
      <div className="body">
        <h1>Editar Produto</h1>
        <EditForm onChange={editProduct} />
      </div>
    </div>
  );
};
