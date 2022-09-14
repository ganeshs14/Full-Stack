const express = require("express");
const bodyParser = require("body-parser");

// Database
const database = require("./database")

// initialize
const booky = express();

booky.use(bodyParser.urlencoded({extended: true}));
booky.use(bodyParser.json());

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
Route         /author
Description   Get specific author based on id
Access        PUBLIC
Parameter     ID
Methods       GET
*/
booky.get("/author/:ID", (req, res) => {
  const getSpecificAuthor = database.authors.filter(
    (author) => author.id === req.params.ID
  );

  if(getSpecificAuthor.length === 0){
    return res.json({error: `No author found for the id ${req.params.ID}`});
  }

  return res.json({authors: getSpecificAuthor});
});


/*
Route         /author/book
Description   Get specific author based on books' isbn
Access        PUBLIC
Parameter     isbn
Methods       GET
*/
booky.get("/author/book/:isbn", (req, res)=> {
  const getSpecificAuthor = database.authors.filter(
    (author) => author.books.includes(req.params.isbn)
  );

  if(getSpecificAuthor.length === 0){
    return res.json({error: `No author found for the book of  ${req.params.isbn}`});
  }
  return res.json({authors: getSpecificAuthor})
});


/*
Route         /publication
Description   Get all publications
Access        PUBLIC
Parameter     None
Methods       GET
*/
booky.get("/publication", (req, res) => {
  return res.json({publications: database.publications});
});

/*
Route         /publication
Description   Get specific publication based on id
Access        PUBLIC
Parameter     id
Methods       GET
*/
booky.get("/publication/:id", (req, res) => {
  const getSpecificPublication = database.publications.filter(
    (publication) => publication.id === req.params.id
  );

  if(getSpecificPublication.length === 0){
    return res.json({error: `No publication found with id ${req.params.id}`})
  }
  return res.json({publications: getSpecificPublication});
});


/*
Route         /publication/book
Description   Get specific publication based on book's isbn
Access        PUBLIC
Parameter     isbn
Methods       GET
*/
booky.get("/publication/book/:isbn", (req, res) => {
  const getSpecificPublication = database.publications.filter(
    (publication) => publication.books.includes(req.params.isbn)
  );

  if(getSpecificPublication.length === 0){
    return res.json({error: `No publication found with book's isbn ${req.params.isbn}`})
  }
  return res.json({publications: getSpecificPublication});
});


/*
Route         /book/new
Description   Add new books
Access        PUBLIC
Parameter     None
Methods       POST
*/
booky.post("/book/new", (req, res) => {
  const newBook = req.body;
  database.books.push(newBook);
  return res.json({updatedBook: database.books});
});


/*
Route         /author/new
Description   Add new authors
Access        PUBLIC
Parameter     None
Methods       POST
*/
booky.post("/author/new", (req, res) => {
  const newAuthor = req.body;
  database.authors.push(newAuthor);
  return res.json({updatedAuthor: database.authors});
});


/*
Route         /publication/new
Description   Add new authors
Access        PUBLIC
Parameter     None
Methods       POST
*/
booky.post("/publication/new", (req, res) => {
  const newPublication = req.body;
  database.publications.push(newPublication);
  return res.json({updatedPublication: database.publications});
});


/*
Route         /publication/update/book
Description   Update / Add new publication
Access        PUBLIC
Parameter     isbn
Methods       PUT
*/
booky.put("/publication/update/book/:isbn", (req, res) => {
  //update the publication in db
  database.publications.forEach((pub) => {
    if(pub.id === req.body.pubID){
      return pub.books.push(req.params.isbn);
    };
});

  //Update the books in db
  database.books.forEach((book) => {
    if(book.ISBN === req.params.isbn){
      book.publications = req.body.pubID;
      return;
    };
  });

  return res.json({
        books: database.books,
        publications: database.publications,
        msg: "Success!!"
      });
});


/*
Route         /book/delete/
Description   Delete a book
Access        PUBLIC
Parameter     isbn
Methods       DELETE
*/
booky.delete("/book/delete/:isbn", (req, res) => {
  // book doesn't match isbn -> push it to another array.
  const updatedBook = database.books.filter((del) => {
    (del) => books.ISBN !== req.params.isbn
  });
  database.books = updatedBook;

  return res.json({
    books: database.books,
    msg: `Successfully deleted book with ISBN: ${req.params.isbn}`
  });
});


/*
Route         /author/delete/
Description   Delete a author using isbn
Access        PUBLIC
Parameter     isbn
Methods       DELETE
*/
booky.delete("/author/delete/:_id", (req, res) => {
  // author doesn't match id -> push it to another array.
  const updatedAuthor = database.authors.filter((del) => {
    (del) => authors.id !== req.params._id
  });
  database.authors = updatedAuthor;

  return res.json({authors: database.authors});
});




booky.listen(3000, () => {
  console.log("Server is up & running!");
})
