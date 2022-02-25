import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

export const CartForm = () => {
  const [product, setProduct]: any = useState({});

  const [qtde, setQtde] = useState<number>(1);

  const params = useParams();

  const [c100, setC100] = useState(0);
  const [c10, setC10] = useState(0);
  const [c20, setC20] = useState(0);
  const [c5, setC5] = useState(0);
  const [m1, setM1] = useState(0);
  const [troco, setTroco]: any = useState(0);

  let subtotal = product.price * qtde;
  let frete = Math.round(subtotal * 0.1);
  let totalPrice = subtotal + frete;

  const findProduct = async () => {
    const res = await api.getProductId(params.id);
    return res;
  };

  useEffect(() => {
    if (!qtde) {
      setQtde(1);
      console.log("oi");
    }
  }, [qtde]);

  useEffect(() => {
    const result = async () => {
      const res = await findProduct();

      setProduct(res);
    };
    result();
  }, []);

  const inc = () => {
    return setQtde(qtde + 1);
  };
  const dec = () => {
    if (qtde > 1) return setQtde(qtde - 1);
  };

  const payment = () => {
    let card: any = document.getElementById("payment");
    let cedula100 = Math.floor(totalPrice / 100);
    let cedula20 = Math.floor((totalPrice % 100) / 20);
    let cedula10 = Math.floor(((totalPrice % 100) % 20) / 10);
    let cedula5 = Math.floor((((totalPrice % 100) % 20) % 10) / 5);
    let moeda1 = Math.floor((((totalPrice % 100) % 20) % 10) % 5);
    let troco =
      1 -
      (totalPrice -
        (cedula100 * 100 +
          cedula5 * 5 +
          cedula20 * 20 +
          cedula10 * 10 +
          moeda1));

    return (
      setC100(cedula100),
      setC20(cedula20),
      setC10(cedula10),
      setC5(cedula5),
      setM1(moeda1),
      setTroco(troco.toFixed(2).replace(".", ",")),
      (card.style.display = "block")
    );
  };

  return (
    <div className="body">
      <div className="top">
        <h1>Carrinho</h1>
        <h1>Resumo do Pedido </h1>
      </div>
      <div className="container2">
        <div className="cart">
          <div style={{ margin: "2%" }}>
            <div className="product">
              <div className="img2">
                <img
                  src={`data:image/jpeg;base64,${product.src}`}
                  alt="imagem-produto"
                />
              </div>
              <div className="info">
                <strong>{product.name}</strong>
                <br />
                <>{product.brand}</>
                <br />
                <>Cor: {product.color}</>
              </div>
            </div>

            <hr />
            <div className="qtde">
              <div className="qtde-card">
                <h1>Quantidade: </h1>
                <button onClick={dec}>
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <input
                  type="number"
                  id="qtde-number"
                  value={qtde}
                  onChange={(e) => {
                    setQtde(e.target.valueAsNumber);
                  }}
                  min="1"
                />
                <button onClick={inc}>
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>

              <h2>R$: {(product.price * qtde).toFixed(2).replace(".", ",")}</h2>
            </div>
          </div>
        </div>

        <div className="resumo">
          <div className="cartInfo">
            <div className="cartCard">
              <h2>
                Subtotal ({qtde} {qtde === 1 ? "item" : "itens"})
              </h2>{" "}
              <h2>R$ {subtotal.toFixed(2).replace(".", ",")}</h2>
            </div>
            <hr />
            <div className="cartCard">
              <h2>Frete </h2> <h2>R$ {frete.toFixed(2).replace(".", ",")}</h2>
            </div>
            <hr />
            <div className="cartCard">
              <h2>Valor total </h2>{" "}
              <h2>R$ {totalPrice.toFixed(2).replace(".", ",")}</h2>
            </div>
            <div>
              <button className="pay-button" onClick={payment}>
                Pagar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="payment-card">
        <div></div>
        <div className="payment" id="payment">
          <h3 style={{ color: "green" }}>Pagamento realizado com sucesso</h3>
          <p style={{ color: "black", fontWeight: "normal" }}>
            Esse pagamento foi realizado com:
          </p>
          <p style={c100 === 0 ? { display: "none" } : { display: "block" }}>
            {c100} {c100 === 1 ? "Cédula" : "Cédulas"} de R$ 100,00 reais
          </p>
          <p style={c20 === 0 ? { display: "none" } : { display: "block" }}>
            {c20} {c20 === 1 ? "Cédula" : "Cédulas"} de R$ 20,00 reais
          </p>
          <p style={c10 === 0 ? { display: "none" } : { display: "block" }}>
            {c10} {c10 === 1 ? "Cédula" : "Cédulas"} de R$ 10,00 reais
          </p>
          <p style={c5 === 0 ? { display: "none" } : { display: "block" }}>
            {c5} {c5 === 0 ? "" : "Cédula"} de R$ 5,00 reais
          </p>
          <p style={m1 === 0 ? { display: "none" } : { display: "block" }}>
            {m1} {m1 === 1 ? "Moeda" : "Moedas  "} de R$ 1,00 real
          </p>
          <p
            style={
              troco === "1,00" ? { display: "none" } : { display: "block" }
            }
          >
            e R$ {troco} {troco === "0,01" ? "centavo" : "centavos"} de troco
          </p>
        </div>
      </div>
    </div>
  );
};
