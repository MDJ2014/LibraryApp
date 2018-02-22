var express = require('express');
var router = express.Router();

var Patron = require('../models').Patron;
var Book = require('../models').Book;
var Loan = require('../models').Loan;

var Sequelize = require('sequelize');
const Op = Sequelize.Op



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});


/***********************************************************************************************BOOKS */
// /******************************************************************ALL */
// router.get('/books', function(req, res, next) {
//   Book.findAll({
//   order: [
//   ['title', 'ASC']
// ]  } 
// ).then(function(results) {
//   res.render('books', {
//     books: results
//    });
// });
// });

// /**************************************************************** DETAIL*/

// router.get('/book_details/:id', function(req, res, next) {
 
//   let errors = [req.query.errors];
//   const foundBook = Book.findById(req.params.id);
//   const foundLoan = Loan.findAll({
//     where: [{
//       book_id : req.params.id
//     }],
//     include: [
//       {model: Patron},
//       {model: Book}
//     ]
//   });

//   Promise.all([foundBook, foundLoan])
//     .then(function(values) {
//      res.render('book_details', {book: values[0], loans: values[1], errors: errors});
    
//   });
// });


// /***********************************************************CHECKED */

// router.get('/checked_books', function(req, res, next) {

//   Book.findAll({
   
//     include: [{
//       all: true,
   
//         where:{
//             loaned_on:{
//               [Op.ne]: null,
//                    },
//           returned_on:{
//                  [Op.eq]:  null
//           }
//         }
//      }],
      
//    }) .then(function(results){
//         res.render('books_checked',{
//         checked: results
//     });
//   }).catch(function(error) {
//        res.send(500, error);
//       }); 
// });


// /********************************************************OVERDUE */
// router.get('/overdue_books', function(req, res, next) {
//   Loan.findAll({
 
//  where:{
//        return_by:{
//            [Op.lt]: new Date(),
//          },
//          returned_on:{
//                 [Op.eq]:  null
//          }
//     },
//         include: [
//             {model: Book},
//              {model: Patron}
//           ]
//  }).then(function(results){
//          res.render('books_overdue',{
//          overdue: results
//      });
//    }).catch(function(error) {
//         res.send(500, error);
//        }); 
//   });


// /*************************************************************NEW */
// router.get('/new_book', function(req, res, next) {

//   res.render('book_new');
// });


/******************************************************* POST NEW */


// router.post('/new_book', function(req, res, next) {
   
//   Book.create(req.body).then(function(book){
//       res.redirect('/books');
//   }).catch(function(error) {
//     res.render("book_new", {errors: error.errors, title: req.body.title, 
//       genre: req.body.genre, author: req.body.author, first_published: req.body.first_published});
// });
 
// });





/***********************************************************RETURN */




/*************************************************************************************************PATRONS */
// /************************************************************** ALL*/
// router.get('/patrons', function(req, res, next) {
//   Patron.findAll({
//     order: [
//     ['last_name', 'ASC']
//   ]  } 
//   ).then(function(results) {
//     res.render('patrons', {
//       patrons: results
//      });
//   });
//   });
// /***********************************************************DETAIL */

// router.get('/patron_details/:id', function(req, res, next) {
 
//   let errors = [req.query.errors];
//   const foundPatron = Patron.findById(req.params.id);
//   const foundLoan = Loan.findAll({
//     where: [{
//       book_id : req.params.id
//     }],
//     include: [
//       {model: Patron},
//       {model: Book}
//     ]
//   });

//   Promise.all([foundPatron, foundLoan])
//     .then(function(values) {
//      res.render('patron_details', {patron: values[0], loans: values[1], errors: errors});
    
//   });
// });



// /****************************************************************NEW*/
// router.get('/new_patron', function(req, res, next) {
//   res.render('patron_new',{patron: Patron.build()});
// });


// /*********************************************************POST NEW */
// router.post('/new_patron', function(req, res, next) {
   
//   Patron.create(req.body).then(function(patron){
//       res.redirect('/patrons');
//   }).catch(function(error) {
//     res.render("patron_new", {errors: error.errors, first_name: req.body.first_name, 
//       last_name: req.body.last_name, address: req.body.address, email: req.body.email, library_id: req.body.library_id,
//     zip_code: req.body.zip_code});
// });
 
// });

/**************************************************************************************************** LOANS*/
/******************************************************************ALL */
// router.get('/loans', function(req, res, next) {
//   Loan.findAll({
//   order: [
//   ['loaned_on', 'ASC']
//   ],
//   include: [
//       {model: Book},
//       {model: Patron}
//     ]
//     } 
// ).then(function(results) {
//   res.render('loans', {
//    loans: results
//    });
// });
// });

// /*****************************************************************OVERDUE */
// router.get('/overdue_loans', function(req, res, next) {
//   Loan.findAll({
 
//  where:{
//        return_by:{
//            [Op.lt]: new Date(),
//          },
//          returned_on:{
//                 [Op.eq]:  null
//          }
//     },
//         include: [
//             {model: Book},
//              {model: Patron}
//           ]
//  }).then(function(results){
//          res.render('loans_overdue',{
//          overdue: results
//      });
//    }).catch(function(error) {
//         res.send(500, error);
//        }); 
//   });


// /******************************************************************CHECKED */

// router.get('/checked_loans', function(req, res, next) {

//   Loan.findAll({
  
//     where:{
//          loaned_on:{
//              [Op.ne]: null,
//             },
//            returned_on:{
//                   [Op.eq]:  null
//            }
//        },
    
//     include: [
//       {model: Book},
//       {model: Patron}
//     ]
//    }).then(function(results){
    
//     res.render('loans_checked',{
//         loans: results
//     });
//   }).catch(function(error) {
//        res.send(500, error);
//       }); 
//   });


// /********************************************************************** NEW*/
// // router.get('/new_loan', function(req, res, next) {

// //   res.render('loan_new');
// // });


// router.get('/new_loan', function(req, res, next) {

//   const allbooks =Book.findAll({
//     order: [
//       ['title', 'ASC']
//     ]
//   });
//   const allpatrons =Patron.findAll({
//     order: [
//       ['last_name', 'ASC']
//     ]
//   });

// Promise.all([allbooks, allpatrons])
//     .then(function(values) {
//      res.render('loan_new', {allbooks: values[0], allpatrons: values[1], errors: errors});
    
//   });

// });








module.exports = router;
