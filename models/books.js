'use strict';
module.exports = (sequelize, DataTypes) => {
  var Book = sequelize.define('Book', {

    title:{ type: DataTypes.STRING,
              validate:{
                notEmpty:{
                  msg:"Book title is required"
                }
              }
            },
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