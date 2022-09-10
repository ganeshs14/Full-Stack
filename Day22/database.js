const books = [
    {
    ISBN: "12345678",
    title: "Tesla",
    pubDate: "2022-09-08",
    language: "en",
    numPage: 250,
    author: [1, 2],
    publications: [1],
    category: ["tech", "space", "eduacation"]
  }
]


const authors = [
  {
    id: "1",
    name: "Aradhana",
    books: ["12345678", "secretBook"]
  },
  {
    id: "2",
    name: "Ganesh",
    books: ["12345678"]
  }
]

const publications = [
  {
    id: "1",
    name: "writex",
    books: ["12345678"]
  },
  {
    id: "2",
    name: "readx",
    books: ["12345678", "secretBook"]
  }
]

module.exports = {books, authors, publications};
