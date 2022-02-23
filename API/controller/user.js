const { User } = require("../dataBase");
const jwt = require("jsonwebtoken");
const { palavraChave } = require("../config");
let controller = {};
const bcrypt = require("bcrypt");

controller.criar = async (name, email, password) => {
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    // console.log(user)

    if (user !== null) return false;

    return await User.create({
      name,
      email,
      password,
    });
  } catch (erro) {
    throw erro;
  }
};

//   try {
//     return await User.create({
//       name,
//       email,
//       password,
//     });
//   } catch (erro) {
//     throw erro;
//   }
// };
controller.listar = async () => {
  try {
    return await User.findAll();
  } catch (erro) {
    throw erro;
  }
};
// controller.atualizar = async (id, name, email, password) => {
//   try {
//     return await User.update(
//       {
//         name,
//         email,
//         password,
//       },
//       {
//         where: {
//           id,
//         },
//       }
//     );
//   } catch (erro) {
//     throw erro;
//   }
// };

controller.buscarporId = async (id) => {
  try {
    return await User.findByPk(id);
  } catch (erro) {
    throw erro;
  }
};

controller.remover = async (id) => {
  try {
    return await User.destroy({ where: { id: id } });
  } catch (erro) {
    throw erro;
  }
};
controller.login = async (email, password) => {
  try {
    const user = await User.scope("login").findOne({
      where: {
        email,
      },
    });
    const rightPassword = await bcrypt.compare(password, user.password);

    if (!rightPassword) return false;

    return jwt.sign({ id: user.id }, palavraChave, {
      expiresIn: "3h",
    });
  } catch (erro) {
    throw erro;
  }
};
// controller.logout = async (email, password) => {
//   try {
//     const user = await User.scope("login").findOne({
//       where: {
//         email,
//       },
//     });

//     const rightPassword = await bcrypt.compare(password, user.password);

//     if (!rightPassword) return false;

//     return jwt.sign({ id: user.id }, palavraChave, {
//       expiresIn: "3h",
//     });
//   } catch (erro) {
//     throw erro;
//   }
// };
module.exports = controller;
