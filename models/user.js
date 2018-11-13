module.exports = function(sequelize, DataTypes) {
  let User = sequelize.define("User", {
    firstName: {
      type: DataTypes.STRING,      
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
    },
    cellPhone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    vetClinicName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    vetName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    vetPhone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    keyInstructions: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    gateCode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    doorCode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    alarmCode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    wifiPassword: {
      type: DataTypes.STRING,
      allowNull: true
    },
    notes: {
      type: DataTypes.TEXT,
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
