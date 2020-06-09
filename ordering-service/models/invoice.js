module.exports = async (db, Sequelize) =>
  db.define("Invoice", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    invoice: Sequelize.STRING,
    total: Sequelize.STRING,
    paid: { type: Sequelize.STRING, defaultValue: 0 },
    buyerId: Sequelize.INTEGER,
  });
