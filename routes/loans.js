var express = require('express');
var router = express.Router();

var Patron = require('../models').Patron;
var Book = require('../models').Book;
var Loan = require('../models').Loan;

var Sequelize = require('sequelize');
const Op = Sequelize.Op




router.get('/', function(req, res, next) {
    Loan.findAll({
    order: [
    ['loaned_on', 'ASC']
    ],
    include: [
        {model: Book},
        {model: Patron}
      ]
      } 
  ).then(function(results) {
    res.render('loans', {
     loans: results
     });
  });
  });
  
  /*****************************************************************OVERDUE */
  router.get('/overdue_loans', function(req, res, next) {
    Loan.findAll({
   
   where:{
         return_by:{
             [Op.lt]: new Date(),
           },
           returned_on:{
                  [Op.eq]:  null
           }
      },
          include: [
              {model: Book},
               {model: Patron}
            ]
   }).then(function(results){
           res.render('loans_overdue',{
           overdue: results
       });
     }).catch(function(error) {
          res.send(500, error);
         }); 
    });
  
  
  /******************************************************************CHECKED */
  
  router.get('/checked_loans', function(req, res, next) {
  
    Loan.findAll({
    
      where:{
           loaned_on:{
               [Op.ne]: null,
              },
             returned_on:{
                    [Op.eq]:  null
             }
         },
      
      include: [
        {model: Book},
        {model: Patron}
      ]
     }).then(function(results){
      
      res.render('loans_checked',{
          loans: results
      });
    }).catch(function(error) {
         res.send(500, error);
        }); 
    });
  
  
  /********************************************************************** NEW*/
  
 
  router.get('/new_loan', function(req, res, next) {
  //res.render('loan_new');
    const allbooks =Book.findAll({
      order: [
        ['title', 'ASC']
      ]
    });
    const allpatrons =Patron.findAll({
      order: [
        ['last_name', 'ASC']
      ]
    });
  
   Promise.all([allbooks, allpatrons])
       .then(function(values) {console.log(values);
        res.render('loan_new', {allbooks: values[0], allpatrons: values[1], errors: errors});
      
     });
  
  });
  
  
  

module.exports = router;


