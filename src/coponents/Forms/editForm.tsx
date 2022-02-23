import { Snackbar, Alert } from "@mui/material";
import { useState, ChangeEvent, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api";

type ItemProps = {
  onChange: (
    id: any,
    name: string,
    brand: string,
    price: number,
    color: string,
    { src }?: any,
    inputDate?: any
  ) => void;
};
export const EditForm = ({ onChange }: ItemProps) => {
  const uploadFile: any = useRef();

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
          setImage(imageFile.url);
        }
      };
    });
  };

  const params = useParams();

  const findProduct = async () => {
    const res = await api.getProductId(params.id);
    return res;
  };


  const [teste, setTeste] = useState(false)

  useEffect(() => {
    const result = async () => {
      const res = await findProduct();
      setProduct(res);
      setInputName(res.name);
      setInputBrand(res.brand);
      setInputPrice(res.price);
      setInputColor(res.color);
      setInputDate(res.createDate);
      setInputSrc(res.src)
      setImage(res.src);
    };
    result();
  }, [teste]);

  const [product, setProduct] = useState<any>();

  const [inputName, setInputName] = useState("");
  const [inputBrand, setInputBrand] = useState("");
  const [inputPrice, setInputPrice]: any = useState("");
  const [inputColor, setInputColor] = useState("");
  const [inputSrc, setInputSrc]:any = useState({});
  const [inputDate, setInputDate] = useState("");
  const [image, setImage] = useState("/addphoto.svg");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [severity, setSeverity] = useState<any>("error");

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
  const successEdit= (e: any) => {
    e
      ? (setOpen(true),
        setMessage("Produto modificado com sucesso"),
        setSeverity("success"))
      : (setOpen(true),
        setMessage("Nenhuma modificação realizada"),
        setSeverity("error"));
  };

  const handleEditProduct = () => {
    if (
      inputBrand != product.brand ||
      inputName != product.name ||
      inputPrice != product.price ||
      inputColor != product.color ||
      inputSrc != image
    ) {
      onChange(
        params.id,
        inputName,
        inputBrand,
        inputPrice,
        inputColor,
        inputSrc,
        inputDate
      )
      let e = true
      successEdit(e);
      teste == true ? setTeste(false) : setTeste(true)
    } else {
      console.log("error");
      let e = false
      successEdit(e);
    }
  };
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  
  return (
    <form className="form">
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
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
            value={inputColor}
            onChange={handleInputColor}
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
          value={inputDate}
        ></input>
      </fieldset>

      <div className="img-box2">
        <label htmlFor="product_pic">
          <div className="imgInput">
            <img src={`data:image/${inputSrc.type};base64,${image}`} alt="img" />
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

      <button className="add-button" type="submit" onClick={handleEditProduct}>
        Atualizar Produto
      </button>
    </form>
  );
};
