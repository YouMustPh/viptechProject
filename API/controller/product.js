const { Product } = require("../dataBase");
let controller = {};

controller.criar = async (name, brand, price, color, src, createDate) => {
  try {
    return await Product.create({
      name,
      brand,
      price,
      color,
      src,
      createDate,
    });
  } catch (erro) {
    throw erro;
  }
};
controller.listar = async () => {
  try {
    return await Product.findAll();
  } catch (erro) {
    throw erro;
  }
};
controller.atualizar = async (id, name, brand, price, color, src, createDate ) => {
  try {
    return await Product.update(
      {
        name,
        brand,
        price,
        color,
        src,
        createDate
      },
      {
        where: {
          id,
        },
      }
    );
  } catch (erro) {
    throw erro;
  }
};

controller.buscarporId = async (id) => {
  try {
    return await Product.findByPk(id);
  } catch (erro) {
    throw erro;
  }
};

controller.remover = async (id) => {
  try {
    return await Product.destroy({ where: { id: id } });
  } catch (erro) {
    throw erro;
  }
};
module.exports = controller;
