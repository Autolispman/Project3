module.exports = function(sequelize, DataTypes) {
    let AppointmentPricing = sequelize.define("AppointmentPricing", {
      typeOfAppointment: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      defaultPrice: {
        type: DataTypes.DECIMAL,
        allowNull: false
      }
    });
  
    return AppointmentPricing;
  };
  