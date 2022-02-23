const { Sequelize, DataTypes } = require("sequelize");
let initProduct = require("./models/productModel");
let initUser = require("./models/userModel")

const options = {
  username: "postgres",
  password: "admin",
  host: "localhost",
  dialect: "postgres",
  database: "Viptech",
  port: 5432,
};

const sequelize = new Sequelize(options);
sequelize
  .authenticate()
  .then(() => {
    console.log("conectado ao banco de dados");
  })
  .catch((erro) => {
    console.log(erro);
  });

const Product = initProduct(sequelize, DataTypes);
const User = initUser(sequelize, DataTypes)

module.exports = { sequelize, Sequelize, Product, User};
