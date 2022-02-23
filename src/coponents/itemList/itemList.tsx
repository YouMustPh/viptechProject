import "./style.css";
import { Item } from "../item/item";
import { useState, useEffect } from "react";
import { api } from "../../api";
import { Btns } from "../Forms/btns";
import { Snackbar, Alert, CircularProgress } from "@mui/material";

export const ItemList = (props: any) => {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const loadProducts = async () => {
    setLoading(true);
    let json = await api.getProducts();
    setLoading(false);
    setProducts(json);
  };

  props.refresh == "Produto adicionado com sucesso" ? loadProducts() : "";
  type ItemProps = {
    id: string;
    name: string;
    brand: string;
    price: number;
    color: string;
    src?: any;
  };

  const onDel = async (id: any) => {
    await api.removeProduct(id);
    loadProducts();
    setOpen(true);
  };

  return (
    <div>
      {loading && (
        <div
          style={{
            width: "100%",
            height: "400px",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </div>
      )}
      {products.length !== 0 ? (
        products.map((e: ItemProps) => (
          <li key={e.id} className="card">
            <Item
              src={e.src}
              id={e.id}
              name={e.name}
              brand={e.brand}
              price={e.price}
              color={e.color}
            />
            <Btns onDel={onDel} id={e.id} />
          </li>
        ))
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>Não há produtos disponiveis</p>
        </div>
      )}
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Produto excluido com sucesso
        </Alert>
      </Snackbar>
    </div>
  );
};
