const { Router } = require("express");
const path = require("path");
const router = Router();

const {
  criar,
  listar,
  remover,
  buscarporId,
  atualizar,
} = require("../controller/user");

router.get("/:id?", async (req, res) => {
  try {
    const { usuarioId } = req;
    const { id } = req.params;
    let resposta;
    console.log(req)

    if (usuarioId) {
      resposta = await profileId(usuarioId);
    }
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
    const { name, email, password } = req.body;
    const userCreated = await criar(name, email, password);
    res.send(userCreated);
  } catch (erro) {
    console.log(erro);
    res.status(500).send({ erro });
  }
});

// router.put("/:id", async (req, res) => {
//   try {
//     let { id } = req.params;
//     const { name, brand, price, color, createDate } = req.body;
//     await atualizar(id, name, brand, price, color, src, createDate);
//     const userEdited = await buscarporId(id);
//     res.send(userEdited);
//   } catch (error) {
//     res.status(500).send({ error });
//   }
// });

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await remover(id);
  } catch (erro) {
    console.log(erro);
    res.status(500).send({ erro });
  }
});

module.exports = router;
