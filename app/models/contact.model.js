module.exports = (sequelize, Sequelize) => {
    const Contact = sequelize.define("contact", {
      firstname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      adress: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });

    return Contact;
  };