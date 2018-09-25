module.exports = function(sequelize, DataTypes) {
  let Appointment = sequelize.define("Appointment", {
    typeOfAppointment: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false
    },
    startDate: {
      type: DataTypes.STRING,
      allowNull: false
    },
    endDate: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  Appointment.associate = function(models) {
    Appointment.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Appointment;
};
