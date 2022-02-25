import { Snackbar, Alert, CircularProgress } from "@mui/material";
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
  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState<any>();

  const [inputName, setInputName] = useState("");
  const [inputBrand, setInputBrand] = useState("");
  const [inputPrice, setInputPrice]: any = useState("");
  const [inputColor, setInputColor] = useState("");
  const [inputSrc, setInputSrc]: any = useState({});
  const [inputDate, setInputDate] = useState("");

  const [image, setImage] = useState("/addphoto.svg");

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [severity, setSeverity] = useState<any>("error");

  const [teste, setTeste] = useState(false);
  const [update, setUpdate] = useState(false);

  const uploadFile: any = useRef();
  const params = useParams();

  const openFileExplorer = () => {
    uploadFile.current.click();
  };

  const handleFile = (event: any) => {
    parseFileToBase64(event.target.files);
  };

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

  const findProduct = async () => {
    setLoading(true);
    const res = await api.getProductId(params.id);
    setInputSrc(res.src);
    setImage(res.src);
    setInputName(res.name);
    setInputBrand(res.brand);
    setProduct(res);
    setInputPrice(res.price);
    setInputColor(res.color);
    setInputDate(res.createDate);
    setLoading(false);

    return res;
  };

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

  function timeout(delay: number) {
    return new Promise((res) => {
      setTimeout(res, delay);
    });
  }

  const successEdit = (e: boolean) => {
    e
      ? (setOpen(true),
        setMessage("Produto modificado com sucesso"),
        setSeverity("success"))
      : (setOpen(true),
        setMessage("Nenhuma modificação realizada"),
        setSeverity("error"));
  };

  useEffect(() => {
    setLoading(true)
    let result = async () => {
       timeout(1000).then(async () => { await findProduct()});
    };
    result();
    if (update) {
      successEdit(true);
    }
  }, [teste]);

  const handleEditProduct = () => {
    setUpdate(true);
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
      );
      teste == true ? setTeste(false) : setTeste(true);
    } else {
      console.log("error");
      let e = false;
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
    <div>
      {loading ? (
        <div className="circularProgress">
          <CircularProgress />
        </div>
      ) : (
        <form className="form">
          <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert
              onClose={handleClose}
              severity={severity}
              sx={{ width: "100%" }}
            >
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
                <option value="" selected disabled hidden>
                  Selecione a cor
                </option>

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
            <label htmlFor="edit_pic">
              <div className="imgInput">
                <img
                  src={`data:image/${inputSrc.type};base64,${image}`}
                  alt="img"
                />
                <p>Adicionar Fotos</p>
              </div>
            </label>
            <input
              onClick={openFileExplorer}
              ref={uploadFile}
              required
              type="file"
              id="edit_pic"
              name="product_pic"
              accept=".jpg, .jpeg, .png"
              onChange={handleFile}
              multiple
            />
          </div>

          <button
            className="add-button"
            type="submit"
            onClick={handleEditProduct}
          >
            Atualizar Produto
          </button>
        </form>
      )}
    </div>
  );
};
