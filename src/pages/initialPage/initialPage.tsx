import { ItemList } from "../../coponents/itemList/itemList";
import "../style.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export const InitialPage = (props:any) => {

  return (
    <div className="container">
      <div className="top">
        <h1>Produtos</h1>
        <Link className="add" to="/addPage">
          <button>
            <FontAwesomeIcon icon={faPlusCircle} />
            &nbsp; Adicionar Produto
          </button>
        </Link>
      </div>
      <div className="itens">
        <ItemList refresh={props.message} />
      </div>
    </div>
  );
};
