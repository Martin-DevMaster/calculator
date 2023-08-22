const calcFunction = document.querySelectorAll('.calcFunction button');
const resultDisplay = document.querySelector('.result');
const inputFuncDisplay = document.querySelector('.inputFunc');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equality = document.querySelector('.equality');
const decimal = document.querySelector('.decimal');
const display = document.querySelector('.display');
const clear = document.querySelector('.clear');
const clearAll = document.querySelector('.clearAll');

let op
let num
let num2
let deci
let deci2
let numAfterOperator = 0;
let numBeforeOperator = 0;
let result

// ## CalcFunction contains all functions as buttons for calculator to work. Since calcFunction is nodelist I had to make it array -
// and use forEach function to get all buttons and addEventListener to each button.
Array.from(calcFunction).forEach(button => {
    button.addEventListener('click', function(e){
      calcMethod(); // ## Function method for calculator options.
// ## For loop is here to check for input text content and insert the number user choose. 
// ## First if statement checks for if user choose number and operator is not true, num variable becomes first number and -
// numBeforeOperator variable is sum. 
// ## Second else if checks for if user clicked number and operator exists inside text content of input then num2 variable becomes -
// second number after operator. 
// ## Third else if checks for if user clicks operator and operator is not true, it assigns - operator to op variable. 
// ## Fourth else if checks if // clicked decimal and if num is true it assigns decimal to deci variable only once and if num2
// is true it assigns decimal to deci2 which also can only be assigned once. 
// ## Last else if check if num2 is true and if user choose operator again, equality button is clicked automatically new chosen -
// operator is assigned to op variable and result with operator are displayed in text content.
        for(let i = 0; i < numbers.length; i++){
          if(e.target === numbers[i] && !inputFuncDisplay.textContent.includes(op)) {
            num = numbers[i].textContent
            numBeforeOperator += num
            if(inputFuncDisplay.textContent.length === 1 && inputFuncDisplay.textContent.includes('0')) {
              inputFuncDisplay.textContent = Number(num) // if user clicks number & first input is 0, it changes 0 to chosen number.
             } else if(deci && inputFuncDisplay.textContent.indexOf(numBeforeOperator) !== inputFuncDisplay.textContent.length -1){
              inputFuncDisplay.textContent += Number(num) // Inserts number after decimal if decimal is true.
             } else if(result) {
              result = 0; // if user clicks number and not operator, result is reset to 0. And users starts all over again.
              inputFuncDisplay.textContent = Number(numBeforeOperator)
            } 
              else {
              inputFuncDisplay.textContent = Number(numBeforeOperator)
            }
            continue;
          } else if(e.target === numbers[i] && inputFuncDisplay.textContent.includes(op)){ 
            if(!deci2 &&  inputFuncDisplay.textContent.indexOf(op) + 1 === inputFuncDisplay.textContent.lastIndexOf('0')) {
                inputFuncDisplay.textContent = inputFuncDisplay.textContent.slice(0, inputFuncDisplay.textContent.indexOf(op) + 1)
                // if first number(num2 variable) after operator is 0 and user doesn't choose decimal, it slices the 0 and adds
                // the number that user choose after choosing 0 - this is only for first number after operator and if number is 0
            } 
              num2 = numbers[i].textContent
              inputFuncDisplay.textContent += num2
              numAfterOperator += num2
            continue;
          }
            else if(e.target === operators[i] && !inputFuncDisplay.textContent.includes(op)){
            op = operators[i].textContent 
            inputFuncDisplay.textContent += op
              if(result) {
                inputFuncDisplay.textContent = Number(Math.round(result * 100) / 100)
                inputFuncDisplay.textContent += op
            // if result is true and user clicks operator and not number, result is displayed in text content and chosen operator.
              } 
          } else if(e.target === decimal) {
            if(num && !inputFuncDisplay.textContent.includes(op) && !deci){
                deci = decimal.textContent
                inputFuncDisplay.textContent += deci
            // This statement is so that user doesn't input more than 1(one) decimal before operator and before first number.
            } else if(num2 && !deci2) {
              deci2 = decimal.textContent
              inputFuncDisplay.textContent += deci2
            // This statement is so that user doesn't input more than 1(one) decimal after operator and before first number after op.
            } else if(inputFuncDisplay.textContent.includes('0') && !deci) {
            // This statement is so that user can choose decimal after first '0' before operator and continue with calculation.
              if(op) {
                continue;
              } else {
              deci = decimal.textContent
              inputFuncDisplay.textContent += deci
              }
            }
            break;
          } else if(num2 && e.target === operators[i]) {
            equality.click()
            op = operators[i].textContent
            inputFuncDisplay.textContent = Number(Math.round(result * 100) / 100)
            inputFuncDisplay.textContent += op
          }
      } 
      decimalMethod(); // ##A function for decimal input by slicing textContent before operator and after operator.
      if(e.target === clear) {
        //if user clicks button('C'), first if statement checks if op is true and numAfterOperator(num2 summed) is true -
        // and if true text content is sliced from op index + 1 to last index and assigned to numAfterOperator. It is done
        // this because numAfterOperator and numBeforeOperator are used in end calculation and final result. The actual 
        // text content is sliced from 0(start) to -1(before end). And else slices text content from 0 to op index and 
        // assigns it to numBeforeOperator.
        if(op && numAfterOperator) {
        numAfterOperator = inputFuncDisplay.textContent.slice(inputFuncDisplay.textContent.indexOf(op) + 1, -1)
        inputFuncDisplay.textContent = inputFuncDisplay.textContent.slice(0, -1);
        } else {
          numBeforeOperator = inputFuncDisplay.textContent.slice(0, inputFuncDisplay.textContent.indexOf(op));
          inputFuncDisplay.textContent = inputFuncDisplay.textContent.slice(0, -1);
          if(inputFuncDisplay.textContent.length === 0) {
            inputFuncDisplay.textContent = '0'
            // if user wants to clear all numbers from text content, when he gets to clearing first number or last, it displays
            // '0' if user clears first index number or last number left in text content.
          }
        }
        // This resets decimals so that when user deletes the decimal he can choose it again.
        deci = ''; 
        deci2 = '';
      } else if(e.target === clearAll) {
        // This statement resets calculator.
        inputFuncDisplay.textContent = '0';
        resultDisplay.textContent = '';
        num = '';
        num2 = '';
        deci = '';
        deci2 = '';
        result = '';
        numBeforeOperator = 0;
        numAfterOperator = 0;
      }
        if(e.target === equality && !result) {
        // This statement is for if users choses equality button and result is not true, method inside calcMethod function is
        // called and result is calculated and displayed with resultDisplay text content and everything is resetted.
        if(!num2) {
          return null
        // This statement is so that user can't use equality and calculate only one number and operator. User will need to
        // choose second number(num after operator).
        }
        else {
        inputFuncDisplay.textContent = '';
        result = method[op](Number(numBeforeOperator),Number(numAfterOperator))
        resultDisplay.textContent = Number(Math.round(result * 100) / 100)
        num = '';
        num2 = '';
        deci = '';
        deci2 = '';
        numBeforeOperator = 0;
        numAfterOperator = 0;
        isNaNResult()
        }
      } else if(e.target === equality && result) {
        // This statement is for if user choses to continue with previous result and use that result as first number before operator
        // and calculate previous result, operator and number after operator that user chooses.
        if(!num2) {
          return null
        } else {
          result = method[op](Number(result),Number(numAfterOperator))
          resultDisplay.textContent = Number(Math.round(result * 100) / 100)
          inputFuncDisplay.textContent = '';
          num = '';
          num2 = '';
          deci = '';
          deci2 = '';
          numBeforeOperator = 0;
          numAfterOperator = 0;
          isNaNResult()
        }
      } 
    }); 
});
function calcMethod() {
  method = {
    "+": (a, b) => a + b
  , "-": (a, b) => a - b
  , '*': (a, b) => a * b
  , '/': (a, b) => a / b
  , '%': (a, b) => a % b
 }
};
function decimalMethod() {
  for(let j = 0; j < inputFuncDisplay.textContent.length; j++) {
    // This statement is so that if user chooses decimal, that number with decimal before or after operator
    // is assigned to numBeforeOperator or numAfterOperator by slicing text content.
    if(inputFuncDisplay.textContent[j] !== op && inputFuncDisplay.textContent.includes('.')) {
      numBeforeOperator = inputFuncDisplay.textContent.slice(0, inputFuncDisplay.textContent.indexOf(op))
      numAfterOperator = inputFuncDisplay.textContent.slice(inputFuncDisplay.textContent.indexOf(op) + 1)
    } 
    break;
  }
}
function isNaNResult() {
  // if any result becomes isNaN(not a number), resultDisplay text content will show 'Math Error'.
  // This is for if user for example chooses to divide 0 with 0.
  if(isNaN(result)) {
    resultDisplay.textContent = 'Math Error'
    result = 0;
  }
}
