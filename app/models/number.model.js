module.exports = (sequelize, DataTypes) => {
    const Number = sequelize.define("number", {
      ContactNumber: {
        type: DataTypes.STRING
      }
    });

    return Number;
  };