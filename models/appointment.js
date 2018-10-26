module.exports = function(sequelize, DataTypes) {
  let Appointment = sequelize.define("Appointment", {
    typeOfAppointment: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    appointmentNotes: {
      type: DataTypes.TEXT,
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
