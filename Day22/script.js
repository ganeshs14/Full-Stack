require("dotenv").config();


const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Database
const database = require("./database/database");

//Models
const BookModel = require("./database/books");
const AuthorModel = require("./database/authors");
const PublicationModel = require("./database/publications");

// Initialize
const booky = express();

booky.use(bodyParser.urlencoded({extended: true}));
booky.use(bodyParser.json());

// Mongoose
mongoose.connect(process.env.MONGO_URL).then(() => console.log("Connection Established!!"));




/*
Route         /
Description   Get all the books
Access        PUBLIC
Parameter     NONE
Methods       GET
*/
booky.get("/",async (req, res) => {
  const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
});


/*
Route         /id
Description   Get specific book based on ISBN
Access        PUBLIC
Parameter     isbn
Methods       GET
*/
booky.get("/id/:isbn",async (req, res) => {

  const getSpecificBook = await BookModel.findOne({ISBN: req.params.isbn});

  if (!getSpecificBook) {
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
booky.get("/cat/:category",async (req, res) => {
  const getSpecificBook = await BookModel.findOne({category: req.params.category});

  if(!getSpecificBook){
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
booky.get("/author",async (req, res) => {
  const getAllAuthors = await AuthorModel.find();
    return res.json(getAllAuthors);

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
booky.post("/book/new",async (req, res) => {
  const {newBook} = req.body;
  const addNewBook = BookModel.create(newBook);
    return res.json({
      books: addNewBook,
      message: "Book was added !!"
  });
});


/*
Route         /author/new
Description   Add new authors
Access        PUBLIC
Parameter     None
Methods       POST
*/
booky.post("/author/new",async (req, res) => {
  const {newAuthor} = req.body;
  const addNewAuthor = AuthorModel.create(newAuthor);
    return res.json({
      author: addNewAuthor,
      message: "New Author was added successfully !!"
    });
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
  const updatedBookDb = database.books.filter(
    (del) => del.ISBN !== req.params.isbn
  );
  database.books = updatedBookDb;

  return res.json({
    books: database.books,
    msg: `Successfully deleted book with ISBN: ${req.params.isbn}`
  });
});


/*
Route         /author/delete/
Description   Delete a author using id
Access        PUBLIC
Parameter     isbn
Methods       DELETE
*/
booky.delete("/author/delete/:_id", (req, res) => {
  // author doesn't match id -> push it to another array.
  const updatedAuthorDb = database.authors.filter(
    (del) => del.id !== parseInt(req.params._id)
  );
  database.authors = updatedAuthorDb;

  return res.json({authors: database.authors});
});


/*
Route         /book/delete/author/
Description   Delete a author from a book and vice versa
Access        PUBLIC
Parameter     isbn, authorId
Methods       DELETE
*/
booky.delete("/book/delete/author/:isbn/:authorId", (req, res) => {
  // Update the book db
  database.books.forEach((book) => {
      if(book.ISBN === req.params.isbn) {
        const newAuthorList = book.author.filter(
          (eachAuthor) => eachAuthor !== parseInt(req.params.authorId)
        );
        book.author = newAuthorList;
        return;
      }
  });

  // Update the author db
  database.authors.forEach((eachAuthor) => {
      if(eachAuthor.id === parseInt(req.params.authorId)){
        const newBookList = eachAuthor.books.filter(
          (book) => book !== req.params.isbn
        );
        eachAuthor.books = newBookList;
        return;
      }
  });

  return res.json({
    book: database.books,
    author: database.authors,
    message: "Author successfully deleted!!!"
  })
});



booky.listen(3000, () => {
  console.log("Server is up & running!");
})
