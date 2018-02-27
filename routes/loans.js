var express = require('express');
var router = express.Router();
const moment = require('moment');
var Patron = require('../models').Patron;
var Book = require('../models').Book;
var Loan = require('../models').Loan;

var Sequelize = require('sequelize');
const Op = Sequelize.Op


let todaysDate = moment().format("YYYY-MM-DD");
let returnDate = moment(todaysDate).add(7, 'days').format("YYYY-MM-DD");



router.get('/', function(req, res, next) {
    Loan.findAll({
      // attributes:[
      //   [Sequelize.fn('strftime', Sequelize.col('loaned_on'), '%Y-%d-%m'), 'loaned_on']
      // ],
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

    loans:results
 //, loanedAt: [Sequelize.fn('strftime', Sequelize.col('loaned_on'), '%Y-%d-%m'), 'loaned_on']
    });
  });
  });

  /*****************************************************************OVERDUE */
  router.get('/overdue_loans', function(req, res, next) {
    Loan.findAll({
   
   where:{
         return_by:{
             //[Op.lt]: new Date()
             $lt: moment().format('YYYY-MM-DD').toString()
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
          loans: results, date_loaned: moment(results.loaned_on).format("YYYY-MM-DD"), date_return_by:moment().format("YYYY-MM-DD")
      });
    }).catch(function(error) {
         res.send(500, error);
        }); 
    });
  
  
  /********************************************************************** NEW LOAN FORM*/
  
 
  router.get('/new_loan', function(req, res, next) {

    const allBooks =Book.findAll({
      order: [
        ['title', 'ASC']
      ]
    });
    const allPatrons =Patron.findAll({
      order: [
        ['first_name', 'ASC'],
        ['last_name', 'ASC']
      ]
    });
  
   Promise.all([allBooks, allPatrons])
       .then(function(values) {
        res.render('loan_new', {abooks: values[0], apatrons: values[1], todaysDate, returnDate});
      
     });
  
  });
  
  /********************************************************************************POST NEW LOAN */
  

  router.post('/new_loan', function(req, res, next) {
   
    Loan.create(req.body).then(function(loan){
        res.redirect('/loans');
    }).catch(function(error) {
      res.render("loan_new", {errors: error.errors, todaysDate, returnDate, todaysDate: req.body.loaned_on, returnDate: req.body.return_by,});
  });
   
  });

  



module.exports = router;


