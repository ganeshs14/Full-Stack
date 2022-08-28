// Conditional Statements
// 1. IF ELSE
// 2. SWITCH

// if().. ,
// if().. else().. ,
// if().. else if().. else().. ;

var n1 = 10;
var n2 = 50;
// var n2 = 10;

console.log("n1 :", n1, "\nn2 :", n2);

if(n1>n2) {
  console.log("n1 is greater than n2");
}
else if(n2>n1) {
  console.log("n2 is greater than n1");
}
else {
  console.log("n1 is equal to n2");
}

// Nested if else

a = -10;

if (a<=0) {
  if (a<0) {
    console.log("negative");
  }
  else {
    console.log("zero");
  }
}
else {
  console.log("positive");
}

// switch case
switch (n1 > n2) {
  case true:
    console.log("First Case : n1 > n2");
    break;
  case false:
    console.log("Second Case : n1 < n2");
    break;
  default:
    console.log("Default Case");
}


// Operators
/*
1. Arithmetic Op -> + - * / %
2. Logical Op -> && || !
3. Assigment Op -> =
4. Comparision Op -> <= => < > == === !=

Note: == (checks value)
      === (checks value as well as datatye)

5. Ternary Op-> condition ? statement true : statement false

*/

var a=0;
var b=0;
var c=0;

b = a++; //postix increment
c = ++a; //prefix increment

console.log({a, b, c});


// Loops
/* 1. for
   2. while
   3. do while
*/

console.log("Even Numbers b/w 0 to 10 using for loop");
for (var i = 0; i <= 10; i++) {
  if (i % 2 === 0) {
    console.log(i);
  }
}


console.log("Even Numbers b/w 0 to 10 using while loop");
var num = 0;
while (num<=10) {
  if (num % 2 === 0) {
    console.log(num);
  }
  num++;
}


console.log("Even Numbers b/w 0 to 10 using do-while loop");
var num=0
do {
  if(num % 2 === 0){
    console.log(num);
  }
  num++;
} while (num<=10);
