const express = require("express");

// Database
const database = require("./database")

// initialize
const booky = express();

/*
Route         /
Description   Get all the books
Access        PUBLIC
Parameter     NONE
Methods       GET
*/
booky.get("/", (req, res) => {
  return res.json({books:database.books});
});


/*
Route         /id
Description   Get specific book based on ISBN
Access        PUBLIC
Parameter     isbn
Methods       GET
*/
booky.get("/id/:isbn", (req, res) => {
  const getSpecificBook = database.books.filter(
    (book) => book.ISBN === req.params.isbn
  );
  if (getSpecificBook.length === 0) {
    return res.json({error: `No Book found for the ISBN of ${req.params.isbn}`});
  }

  return res.json({book: getSpecificBook})
});


/*
Route         /cat
Description   Get specific book based on category
Access        PUBLIC
Parameter     category
Methods       GET
*/
booky.get("/cat/:category", (req, res) => {
  const getSpecificBook = database.books.filter(
    (book) => book.category.includes(req.params.category)
  );
  if(getSpecificBook.length === 0){
    return res.json({error: `No book found for the category of ${req.params.category}`});
  }

  return res.json({book: getSpecificBook});
});


/*
Route         /lang
Description   Get specific book based on language
Access        PUBLIC
Parameter     language
Methods       GET
*/
booky.get("/lang/:language", (req, res) => {
  const getSpecificBook = database.books.filter(
    (book) => book.language.includes(req.params.language)
  );
  if(getSpecificBook.length === 0){
    return res.json({error: `No book found for the language of ${req.params.language}`});
  }

  return res.json({book: getSpecificBook});
});


/*
Route         /author
Description   Get all authors
Access        PUBLIC
Parameter     None
Methods       GET
*/
booky.get("/author", (req, res) => {
  return res.json({authors: database.authors});
});


/*
Route         /auth_id
Description   Get specific author based on id
Access        PUBLIC
Parameter     ID
Methods       GET
*/
booky.get("/auth_id/:ID", (req, res) => {
  const getAuthor = database.authors.filter(
    (author) => author.id === req.params.ID
  );

  if(getAuthor.length === 0){
    return res.json({error: `No author found for the id ${req.params.ID}`});
  }

  return res.json({authors: getAuthor});
});
















booky.listen(3000, () => {
  console.log("Server is up & running!");
})
