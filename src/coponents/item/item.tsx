import "./style.css";

export const Item = (props: any) => {
  return (
    <div className="item">
      <div className="productPlace">
        <div className="img-box">
          <div>
            <img src={`data:image/jpeg;base64,${props.src}`} alt={props.name} />
          </div>
        </div>
        <div className="info">
          <p style={{ fontSize: "2em", fontWeight: "bold" }}>{props.name}</p>
          <p>{props.brand}</p>
          <p
            style={{ color: "#0f4c81", fontSize: "2.5em", fontWeight: "bold" }}
          >
            R$ {props.price.toFixed(2).replace(".", ",")}
          </p>
          <p>Cor: {props.color}</p>
        </div>
      </div>
    </div>
  );
};
