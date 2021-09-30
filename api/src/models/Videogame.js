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
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    released: {
      type: DataTypes.DATEONLY,
    },
    rating: {
      type: DataTypes.INTEGER,
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
      allowNull: false
    }
  })

  sequelize.define('platforms', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })
};
