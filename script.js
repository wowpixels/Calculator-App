"use strict";

// get values from html
let displayScreen = document.getElementById("display");
let numbers = document.querySelectorAll(".numbers div");
let operators = document.querySelectorAll(".operators div");
let result = document.getElementById("equals");
let clear = document.getElementById("clear");
let dayKey = document.getElementById("day");
let nightKey = document.getElementById("night");

// Day and Night
dayKey.addEventListener("click", function () {
  document.getElementById("body").classList.add("day");
  document.getElementById("shiftDay").classList.add("dayScreen");
  document.getElementById("day").classList.add("keepSpinning");
  document.getElementById("night").classList.remove("keepSpinning");
  document.getElementById("quote").classList.add("dayColor");
  document.getElementById("copyright").classList.add("dayColor");

  let list;
  list = document.querySelectorAll("div.keyOperators, div.keyEquals, div.keyClears");
  for (let i = 0; i < list.length; ++i) {
    list[i].classList.add("opacityDay");
  }
});

nightKey.addEventListener("click", function () {
  document.getElementById("body").classList.remove("day");
  document.getElementById("shiftDay").classList.remove("dayScreen");
  document.getElementById("night").classList.add("keepSpinning");
  document.getElementById("day").classList.remove("keepSpinning");
  document.getElementById("quote").classList.remove("dayColor");
  document.getElementById("copyright").classList.remove("dayColor");
  let list;
  list = document.querySelectorAll("div.keyOperators, div.keyEquals, div.keyClears");
  for (let i = 0; i < list.length; ++i) {
    list[i].classList.remove("opacityDay");
  }
});

// Calculator
// start with false result display
let resultDisplayed = false;

// start by adding the click handler for the numbers
for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener("click", function (e) {
    // store current input string and its last character
    let currentString = displayScreen.innerHTML;
    let lastChar = currentString[currentString.length - 1];
    document.getElementById("blinker").style.display = "inline";

    // when result is not showing then keep adding numbers
    if (resultDisplayed === false) {
      displayScreen.innerHTML += e.target.innerHTML;
    } else if ((resultDisplayed === true && lastChar === "+") || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
      resultDisplayed = false;
      displayScreen.innerHTML += e.target.innerHTML;
    } else {
      resultDisplayed = false;
      displayScreen.innerHTML = "";
      displayScreen.innerHTML += e.target.innerHTML;
    }
  });
}

// handlers for operators
for (let i = 0; i < operators.length; i++) {
  operators[i].addEventListener("click", function (e) {
    // store current input string and its last character
    let currentString = displayScreen.innerHTML;
    let lastChar = currentString[currentString.length - 1];
    document.getElementById("blinker").style.display = "inline";

    // if last character entered is an operator, replace it with the currently pressed one
    if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
      let newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
      displayScreen.innerHTML = newString;
    } else if (currentString.length == 0) {
      // if first key pressed is an opearator, don't do anything
      console.log("enter a number first");
    } else {
      // else just add the operator pressed to the input
      displayScreen.innerHTML += e.target.innerHTML;
    }
  });
}

// on click of 'equal' button
result.addEventListener("click", function () {
  // this is the string that we will be processing eg. -10+26+33-56*34/23
  let inputString = displayScreen.innerHTML;

  // forming an array of numbers. eg for above string it will be: numbers = ["10", "26", "33", "56", "34", "23"]
  let numbersArray = inputString.split(/\+|\-|\×|\÷/g);

  // forming an array of operators. for above string it will be: operators = ["+", "+", "-", "*", "/"]
  // first we replace all the numbers and dot with empty string and then split
  let operatorsArray = inputString.replace(/[0-9]|\./g, "").split("");

  console.log(inputString);
  console.log(operatorsArray);
  console.log(numbersArray);
  console.log("----------------------------");

  // now we are looping through the array and doing one operation at a time.
  // first divide, then multiply, then subtraction and then addition
  // as we move we are alterning the original numbers and operators array
  // the final element remaining in the array will be the output

  document.getElementById("blinker").style.display = "none";

  let divide = operatorsArray.indexOf("÷");
  while (divide != -1) {
    numbersArray.splice(divide, 2, numbersArray[divide] / numbersArray[divide + 1]);
    operatorsArray.splice(divide, 1);
    divide = operatorsArray.indexOf("÷");
  }

  let multiply = operatorsArray.indexOf("×");
  while (multiply != -1) {
    numbersArray.splice(multiply, 2, numbersArray[multiply] * numbersArray[multiply + 1]);
    operatorsArray.splice(multiply, 1);
    multiply = operatorsArray.indexOf("×");
  }

  let subtract = operatorsArray.indexOf("-");
  while (subtract != -1) {
    numbersArray.splice(subtract, 2, numbersArray[subtract] - numbersArray[subtract + 1]);
    operatorsArray.splice(subtract, 1);
    subtract = operatorsArray.indexOf("-");
  }

  let add = operatorsArray.indexOf("+");
  while (add != -1) {
    // using parseFloat is necessary, otherwise it will result in string concatenation :)
    numbersArray.splice(add, 2, parseFloat(numbersArray[add]) + parseFloat(numbersArray[add + 1]));
    operatorsArray.splice(add, 1);
    add = operatorsArray.indexOf("+");
  }

  displayScreen.innerHTML = numbersArray[0]; // displaying the output

  resultDisplayed = true; // turning flag if result is displayed
});

// clearing the input on press of clear
clear.addEventListener("click", function () {
  displayScreen.innerHTML = "";
});
