var express = require('express');
var router = express.Router();

var Patron = require('../models').Patron;
var Book = require('../models').Book;
var Loan = require('../models').Loan;

var Sequelize = require('sequelize');
const Op = Sequelize.Op


/************************************************************** ALL*/
router.get('/', function(req, res, next) {
    Patron.findAll({
      order: [
      ['last_name', 'ASC']
    ]  } 
    ).then(function(results) {
      res.render('patrons', {
        patrons: results
       });
    });
    });
  /***********************************************************DETAIL */
  
  router.get('/:id', function(req, res, next) {
    let errors = [req.query.errors];
    const foundPatron = Patron.findById(req.params.id);
    const foundLoan = Loan.findAll({
      where: [{
        book_id : req.params.id
      }],
      include: [
        {model: Patron},
        {model: Book}
      ]
    });
  
    Promise.all([foundPatron, foundLoan])
      .then(function(values) {
       res.render('patron_details', {patron: values[0], loans: values[1], errors: errors});
      
    });
  });
  
  
  
  /****************************************************************NEW*/
  router.get('/new_patron', function(req, res, next) {
    res.render('patron_new',{patron: Patron.build()});
  });
  
  
  /*********************************************************POST NEW */
  router.post('/new_patron', function(req, res, next) {
     
    Patron.create(req.body).then(function(patron){
        res.redirect('/patrons');
    }).catch(function(error) {
      res.render("patron_new", {errors: error.errors, first_name: req.body.first_name, 
        last_name: req.body.last_name, address: req.body.address, email: req.body.email, library_id: req.body.library_id,
      zip_code: req.body.zip_code});
  });
   
  });









module.exports = router;




