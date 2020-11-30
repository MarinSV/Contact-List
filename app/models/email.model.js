module.exports = (sequelize, DataTypes) => {
    const Email = sequelize.define("email", {
      email: {
        type: DataTypes.STRING
      }
    });
  
    return Email;
  };