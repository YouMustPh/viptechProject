const { Router } = require("express");
const path = require("path");
const router = Router();

const {
  criar,
  listar,
  remover,
  buscarporId,
  atualizar,
} = require("../controller/product");

router.get("/:id?", async (req, res) => {
  try {
    const { id } = req.params;
    let resposta;

    if (id) {
      resposta = await buscarporId(id);
    } else {
      resposta = await listar();
    }

    res.send(resposta);
  } catch (erro) {
    console.log(erro);
    res.status(500).send({ erro });
  }
});

router.post("/", async (req, res) => {
  try {
    const file = req.body.src;
    const src = file.url;
    const { name, brand, price, color, createDate } = req.body;
    const userCreated = await criar(name, brand, price, color, src, createDate);
    res.send(userCreated);
  } catch (erro) {
    console.log(erro);
    res.status(500).send({ erro });
  }
});

router.put("/:id", async (req, res) => {
  try {
    // let id = req.params.id;
    // let dados = req.body;
    // await atualizar(id, dados);
    // const result = await buscarporId(id);

    // res.send(result);

    let { id } = req.params;
    const file = req.body.src;
    const src = file.url;
    const { name, brand, price, color, createDate } = req.body;
    await atualizar(id, name, brand, price, color, src, createDate);
    const productEdited = await buscarporId(id);
    res.send(productEdited);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await remover(id);
    result = await listar();

    res.send(result);
  } catch (erro) {
    console.log(erro);
    res.status(500).send({ erro });
  }
});
module.exports = router;
