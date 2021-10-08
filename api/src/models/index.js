const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    released: {
      type: DataTypes.DATEONLY,
    },
    rating: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    background_image: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  });

  sequelize.define('genres', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    }
  })

  sequelize.define('platforms', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    }
  })
};