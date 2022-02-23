const express = require("express");
const cors = require("cors");
const fileUpload = require('express-fileupload')

const app = express();
const product = require("./Routes/product");
const user = require("./Routes/user")
const login = require("./Routes/login");
const tokenVerify = require("./middleware/tokenVerify");
const { sequelize } = require("./dataBase");

app.use(express.json());
app.use("/public", express.static('public'))
app.use("/user", express.static('user'))
app.use(fileUpload())

app.use(cors({ origin: "http://localhost:3000" }));

app.get("/", (req, res) => {
  res.send({ mensagem: "Welcome" });
});

app.use("/product", product);
app.use("/user", user)
app.use("/login", login);
app.use(tokenVerify);

app.listen(3001, () => {
  console.log("initialized application");
});
