// REST API

// RE - REpresentational
// S - State
// T - Transfer

// Representing Data by sharing after processing.

// import
const express = require("express");

// initialize
const noddy = express();

noddy.use(express.json());

// HTTPS METHODS
/*
GET -> To retrieve any data
POST -> TO send a data to the server
PUT -> To update an existing data
DELETE -> To delete an existing data
*/

noddy.get("/", (req, res) => {
    return res.json({data: "Hello, World;"})
});

noddy.get("/about", (req, res) => {
    return res.json({data: "This is a about page."})
});

noddy.get("/data/:id", (req, res) => {
  const student = [
    {id: 1,
    name: "Student1"},
    {id: 2,
    name: "Student2"},
    {id: 3,
    name: "Student3"},
    {id: 4,
    name: "Student4"},
    {id: 5,
    name: "Student5"}
  ];

  const studID = req.params.id;
  const getStudent = student.filter((stud) => stud.id === parseInt(studID));
  return res.json({data: getStudent}) ;
})


noddy.listen(3000, () => {
  console.log("server on port 3000 is up and running!");
});
