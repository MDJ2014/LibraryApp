// 'use strict';
// module.exports = (sequelize, DataTypes) => {
//   var Loan = sequelize.define('Loan', {
//    // id: DataTypes.INTEGER,
//     book_id: DataTypes.INTEGER,
//     patron_id: DataTypes.INTEGER,
//     loaned_on: DataTypes.DATE,
//     return_by: DataTypes.DATE,
//     returned_on: DataTypes.DATE
//   }, {

//     tableName: 'loans', 
//     timestamps: false,


//   });
//   Loan.associate = function(models) {
//     Loan.belongsTo(models.Book, { foreignKey: "book_id" });
//     Loan.belongsTo(models.Patron, { foreignKey: "patron_id" });
//   };
//   return Loan;
// };

'use strict';

const moment = require('moment');
module.exports = (sequelize, DataTypes) => {
  var Loan = sequelize.define('Loan', {
   // id: DataTypes.INTEGER,
    book_id: DataTypes.INTEGER,
    patron_id: DataTypes.INTEGER,
    loaned_on: DataTypes.DATEONLY,
    return_by: DataTypes.DATEONLY,
    returned_on: DataTypes.DATEONLY
  }, {

    tableName: 'loans', 
    timestamps: false,
    instanceMethods: {

      loanedAt: function() {
        return moment(this.loaned_on).format("YYYY-MM-DD");
      }
    },

  });
  Loan.associate = function(models) {
    Loan.belongsTo(models.Book, { foreignKey: "book_id" });
    Loan.belongsTo(models.Patron, { foreignKey: "patron_id" });
  };
  return Loan;
};