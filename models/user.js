module.exports = function(sequelize, DataTypes) {
  let User = sequelize.define("User", {
    firstName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    street1: {
      type: DataTypes.STRING,
      allowNull: true
    },
    street2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "Tx"
    },
    zipCode: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

   User.associate = function(models) {
     User.hasMany(models.Appointment, {
       onDelete: "cascade"
     });
    //   Admin.hasMany(models.Pet, {
    //     onDelete: "cascade"
    //   });
    //   Admin.hasMany(models.Home, {
    //     onDelete: "cascade"
    //   });
  };
  return User
};
