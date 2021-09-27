const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripción: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    released: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });

  sequelize.define('genres', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })

  sequelize.define('plataforms', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })
};
