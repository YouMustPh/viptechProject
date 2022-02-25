const { Router } = require("express");
const router = Router();
const { login } = require("../controller/user");

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    const token = await login(email, password);

    if (token) {
      res.send(token);
    } else {
      res.status(401).send({ erro: "Login ou senha inválidos" });
    }
  } catch (erro) {
    console.log(erro);
    res.status(500).send({ erro });
  }
});

module.exports = router;
