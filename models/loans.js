'use strict';

const moment = require('moment');
module.exports = (sequelize, DataTypes) => {
  var Loan = sequelize.define('Loan', {
  
    book_id: DataTypes.INTEGER,
    patron_id: DataTypes.INTEGER,
    loaned_on: DataTypes.DATEONLY,
    return_by: DataTypes.DATEONLY,
    returned_on: DataTypes.DATEONLY
  }, {

    tableName: 'loans', 
    timestamps: false,
    
  });
  Loan.associate = function(models) {
    Loan.belongsTo(models.Book, { foreignKey: "book_id" });
    Loan.belongsTo(models.Patron, { foreignKey: "patron_id" });
  };
  return Loan;
};