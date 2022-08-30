function getArray() {
  return [28,33];
}

const [x, y, z] = getArray();
console.log("x :",x,"\ny :", y,"\nz :", z);


// Map Function

var myArr = [1, 2, 3, 4, 5];

var newMyArr = myArr.map(i => i+10);

console.log(newMyArr);
console.log(myArr);


// Filter Function

var myArr = [10, 21, 33, 40, 50];

var newMyArr = myArr.filter(i => i%2===1);

console.log(newMyArr);
console.log(myArr);


// ES 6

function hello(name="World") {
  console.log("Hello, "+name);
};

hello();
hello("Joe");



// Template Literals

console.log("A\nB\nC");
console.log("---------");
console.log(`
A
B
C
`);


// Scoping
// let keyword

function outer(){
  n1="asdfg"
  let n2=";lkjh"

  function inner(){
    var n1="asdfghjkl;"
    let n2=";lkjghfdsa"
    console.log(n1, n2);
  }
  inner();
  console.log(n1, n2);
  var n1;
}
outer();


// ASYNCHRONOUS JS

// PROMISES

console.log(fetch("https://jsonplaceholder.typicode.com/users"));

console.log(fetch("https://jsonplaceholder.typicode.com/users").then((result)=> console.log(result)));

console.log(fetch("https://jsonplaceholder.typicode.com/users")
.then((result) => result.json())
.then((data) => console.log(data)));

console.log("---------------------");

// ASYNC AWAIT

const getData = async () => {
  const result = await fetch("https://jsonplaceholder.typicode.com/users")
  const data = await result.json()
  console.log(data);
};

getData();
