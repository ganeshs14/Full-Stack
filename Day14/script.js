// FUNCTIONS

const items =  {
  item1 : 10,
  item2 : 20,
  item3 : 30
};

var cart = 0;
function addToCart(param) {
  cart += param;
}

addToCart(items.item1);
addToCart(items.item2);
addToCart(items.item3);

console.log("Total Cart : ", cart);


// HOISING : Declaring the variable after using it.

num = 0;
console.log("Number is ", num);
var num;


// ARROW FUNCTIONS

var addNumber = (num1, num2) => {
  return num1+num2;
};

console.log("Sum = ", addNumber(5,6));


// this keyword

console.log(this);


const obj = {
  name : "this_keyword",
  getThisFunc : function() {
    console.log(this);
  },
  getThisArrow : () => console.log(this)
};

obj.getThisFunc();
obj.getThisArrow();


// ARRAY FUNCTIONS

var arr = [1, 2, 3, 4, 5]
console.log(arr);

arr.push(6);
console.log("push :", arr);
arr.pop();
console.log("pop :", arr);
arr.unshift(0);
console.log("unshift :", arr);
arr.shift();
console.log("shift :", arr);


// RECURSION

var number = 0;
function printNum() {
  console.log(number);
  number++;

  if (number<=10)
    printNum();
  else
    return;
};

printNum()
