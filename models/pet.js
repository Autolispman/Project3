module.exports = function(sequelize, DataTypes) {
  let Pet = sequelize.define("Pet", {
    petName: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false
    },
    breed: {
      type: DataTypes.STRING,
      allowNull: true
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fixed: {
      type: DataTypes.STRING,
      allowNull: true
    },
    crateTrained: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    houseTrained: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    feedingInstructions: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    medications: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    healthIssues: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    foodAllergies: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  });

  Pet.associate = function(models) {
    Pet.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Pet;
};
