module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "product",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      brand: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      src: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    {
      tableName: "product",
      timestamps: false,
    }
  );
  return Product;
};
