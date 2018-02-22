'use strict';
module.exports = (sequelize, DataTypes) => {
  var Book = sequelize.define('Book', {
    //id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    genre: DataTypes.STRING,
    first_published: DataTypes.INTEGER
  }, {
    
    tableName: 'books', 
    timestamps: false,
    
  }); 

  Book.associate = function(models){
    Book.hasOne(models.Loan, {foreignKey: 'book_id'});
//changed hasMany to has One
  };
  return Book;
}