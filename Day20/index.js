// PORTS
/*
Entry point for our server.
Gateway through which external services can enter our server.
Database Connection, Authentication, Sercurity Services, Cloud Services, etc...
*/


// HEADERS
/*
Additional coded information
SERVER A -------> SERVER B
*/


// HTTPS STATUS CODE
/*
SUCCESS: 200
FAILURE: 404 -> not available,
         401 -> not authorized,
         404 -> auth but forbideen to access
SERVER ERROR : 500
.
.
*/


// JSON
/*
Shortend format to exchange information btw two servers.
*/

/*******************************************************************/

// Module: filesystem
const fileSystem = require("fs");

// // Creating a file.
// fileSystem.writeFile("one_piece.txt", "Ore wa Monkey D. Luffy", function(err, result){
//   if(err) {
//     console.log(err);
//   }
});

// // Deleting a file.
// fileSystem.unlink("one_piece.txt", function(err, result){
//   if(err) {
//     console.log(err);
//   }
// });

// // Creating a folder.
// fileSystem.mkdir("one_piece", function(err, result){
//   if(err) {
//     console.log(err);
//   }
// });

// // Deleting a folder.
// fileSystem.rmdir("one_piece", function(err, result){
//   if(err) {
//     console.log(err);
//   }
// });

/*******************************************************************/

// Module: Operating System.
const operatingSystem = require("os");

// // OS
// console.log(operatingSystem.platform());

// // Architecture
// console.log(operatingSystem.arch());


/*******************************************************************/

// Module: http
const http = require("http");

// http.createServer((request, response) => {
//   console.log(request.headers);
//   response.end("Mochi Mochi Luffy!!!!")
// }).listen(3000);
