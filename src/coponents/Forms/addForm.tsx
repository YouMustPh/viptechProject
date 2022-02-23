import { useState, ChangeEvent, HTMLInputTypeAttribute, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

type ItemProps = {
  onAdd: (
    name: string,
    brand: string,
    price: number,
    color: string,
    { src }: any,
    createDate: any
  ) => void;
};
export const AddForm = ({ onAdd }: ItemProps) => {
  const navigate = useNavigate()
  const uploadFile: any = useRef();
  const [image, setImage] = useState("/addphoto.svg");

  function openFileExplorer() {
    uploadFile.current.click();
  }

  function handleFile(event: any) {
    parseFileToBase64(event.target.files);
  }

  const parseFileToBase64 = (files: any) => {
    const file = files[0];

    file.text().then(() => {
      let reader: FileReader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const src = reader.result;
        if (typeof src === "string") {
          const imageFile = {
            url: src.slice(src.lastIndexOf(",") + 1, src.length),
            name: file.name,
            type: file.type,
          };
          setInputSrc(imageFile);
          setImage(`data:image/jpeg;base64,${imageFile.url}`);
        }
      };
    });
  };

  const [inputName, setInputName] = useState("");
  const [inputBrand, setInputBrand] = useState("");
  const [inputPrice, setInputPrice]: any = useState("");
  const [inputColor, setInputColor]: any = useState("Selecione a cor");
  const [inputSrc, setInputSrc]:any = useState('');

  const handleInputName = (e: ChangeEvent<HTMLInputElement>) => {
    setInputName(e.target.value);
  };
  const handleInputBrand = (e: ChangeEvent<HTMLInputElement>) => {
    setInputBrand(e.target.value);
  };
  const handleInputPrice = (e: ChangeEvent<HTMLInputElement>) => {
    setInputPrice(e.target.valueAsNumber);
  };
  const handleInputColor = (e: ChangeEvent<HTMLSelectElement>) => {
    setInputColor(e.target.value);
  };

  const date = new Date().toLocaleDateString('en-CA')


  const handleAddProduct = () => {
    if (
      inputBrand !== "" &&
      inputName !== "" &&
      inputPrice !== "" &&
      inputColor !== "Selecione a cor" &&
      inputSrc !== ''
    ) {
      onAdd(inputName, inputBrand, inputPrice, inputColor, inputSrc, date);
      navigate("/initialPage")
      // window.location.reload()
    } else {
      console.log("erro");
    }
  };

  return (
    <form className="form">
      <fieldset className="card2">
        <legend>Nome do produto</legend>
        <input
          placeholder="Digite o nome do produto"
          id="name"
          type="text "
          required
          value={inputName}
          onChange={handleInputName}
        ></input>
      </fieldset>

      <fieldset className="card2">
        <legend>Marca</legend>
        <input
          placeholder="Digite o marca do produto"
          id="name"
          type="text "
          required
          value={inputBrand}
          onChange={handleInputBrand}
        ></input>
      </fieldset>

      <fieldset className="card1">
        <legend>Valor</legend>
        <label className="static-value" htmlFor="price">
          R$
        </label>
        <input
          placeholder="000,00"
          id="price"
          type="number"
          required
          value={inputPrice}
          onChange={handleInputPrice}
        ></input>
      </fieldset>

      <fieldset className="card1">
        <legend>Cor</legend>
        <div className="select">
          <select
            id="color"
            name="Cor"
            required
            onChange={handleInputColor}
            style={{
              color: inputColor === "Selecione a cor" ? "gray" : "black",
            }}
          >
            <option value="Selecione a cor">Selecione a cor</option>

            <option value="Branco">Branco</option>

            <option value="Preto">Preto</option>

            <option value="Sem cor unica">Sem cor unica</option>
          </select>
        </div>
      </fieldset>

      <fieldset className="card1">
        <legend>Data de Cadastro</legend>
        <input
          id="date"
          type="date"
          required
          readOnly
          value={date}
        ></input>
      </fieldset>

      <div className="img-box2">
        <label htmlFor="product_pic">
          <div className="imgInput">
            <img src={image} alt="img" />
            <p>Adicionar Fotos</p>
          </div>
        </label>
        <input
          onClick={openFileExplorer}
          ref={uploadFile}
          required
          type="file"
          id="product_pic"
          name="product_pic"
          accept=".jpg, .jpeg, .png"
          onChange={handleFile}
          multiple
        />
      </div>
      {/* <Link to="/" id="linkHome"> */}
      <button
        className="add-button"
        type="submit"
        id="linkHome"
        onClick={handleAddProduct}
      >
        Adicionar Produto
      </button>
      {/* </Link> */}
    </form>
  );
};
