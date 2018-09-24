const bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes) {
  let Admin = sequelize.define(
    "Admin",
    {
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2
      }
    }
    // {
    //   instanceMethods: {
    //     comparePasswords: comparePasswords
    //   },
    //   hooks: {
    //     beforeValidate: hashPassword
    //   }
    // }
  );

  // Admin.associate = function(models) {
  //   Admin.hasMany(models.Appointment, {
  //     onDelete: "cascade"
  //   });
  //   Admin.hasMany(models.Pet, {
  //     onDelete: "cascade"
  //   });
  //   Admin.hasMany(models.Home, {
  //     onDelete: "cascade"
  //   });
  // };
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  Admin.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  Admin.hook("beforeCreate", function(admin) {
    admin.password = bcrypt.hashSync(
      admin.password,
      bcrypt.genSaltSync(10),
      null
    );
  });

  return Admin;
};

//previous auth strategy

// // Compares two passwords.
// // TODO: Password comparison logic.
// function comparePasswords(password, callback) {
//   bcrypt.compare(password, this.password, function(error, isMatch) {
//     if (error) {
//       return callback(error);
//     }

//     return callback(null, isMatch);
//   });
// }

// // Hashes the password for a user object.

// function hashPassword(user) {
//   if (user.changed("password")) {
//     return bcrypt.hash(user.password, 10).then(function(password) {
//       user.password = password;
//     });
//   }
// }
