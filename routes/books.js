var express = require('express');
var router = express.Router();

var Patron = require('../models').Patron;
var Book = require('../models').Book;
var Loan = require('../models').Loan;

var Sequelize = require('sequelize');
const Op = Sequelize.Op



/******************************************************************ALL */
router.get('/', function(req, res, next) {
    Book.findAll({
    order: [
    ['title', 'ASC']
  ]  } 
  ).then(function(books) {
    res.render('books', {
      books
     });
  });
  });
  

  
  
  /***********************************************************CHECKED */
  
  router.get('/checked_books', function(req, res, next) {
  
    Book.findAll({
     
      include: [{
        all: true,
     
          where:{
              loaned_on:{
                [Op.ne]: null,
                     },
            returned_on:{
                   [Op.eq]:  null
            }
          }
       }],
        
     }) .then(function(checked){
          res.render('books_checked',{
          checked
      });
    }).catch(function(error) {
         res.send(500, error);
        }); 
  });
  
  
  /********************************************************OVERDUE */
  router.get('/overdue_books', function(req, res, next) {
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
           res.render('books_overdue',{
           overdue: results
       });
     }).catch(function(error) {
          res.send(500, error);
         }); 
    });
  
  
  /*************************************************************NEW */
  router.get('/new_book', function(req, res, next) {
  
    res.render('book_new');
  });
  

/******************************************************* POST NEW */


router.post('/new_book', function(req, res, next) {
   
    Book.create(req.body).then(function(book){
        res.redirect('/books');
    }).catch(function(error) {
      res.render("book_new", {errors: error.errors, title: req.body.title, 
        genre: req.body.genre, author: req.body.author, first_published: req.body.first_published});
  });
   
  });


  /**************************************************************** DETAIL*/
  
  router.get('/:id', function(req, res, next) {
   
    let errors = [req.query.errors];
    const foundBook = Book.findById(req.params.id);
    const foundLoan = Loan.findAll({
      where: [{
        book_id : req.params.id
      }],
      include: [
        {model: Patron},
        {model: Book}
      ]
    });
  
    Promise.all([foundBook, foundLoan])
      .then(function(values) {
       res.render('book_details', {book: values[0], loans: values[1], errors: errors});
      
    });
  });

/**********************************************************************************UPDATE */

router.post("/books/:id", function(req, res, next) {
Book.findById(req.params.id).then(function(book){

  return book.update(req.body);
}).then(function(book){
res.redirect("/books");
});
 });






 module.exports = router;