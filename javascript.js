

  const display = document.querySelector('#display');
  const allButtons = document.querySelectorAll('button');

  let buttonRow = [];
  let operated = false;
  let operatedWithoutNextValue = false;

  let operation = {
    firstNum: [],
    operator: undefined,
    nextNum: [],
  };

  allButtons.forEach((button) => {
    button.addEventListener('click', () => {

      if (button.textContent === '=' && ((operation['firstNum'].length > 0 || Array.isArray(operation['firstNum']) == false)
      && operation['operator'] !== undefined && operation['nextNum'].length > 0)) {
        operate(operation);
        buttonRow.splice(0, buttonRow.length, operation['firstNum']);

      } else if ('0123456789.'.includes(button.textContent) && operation['nextNum'].length == 0
       && operation['operator'] == undefined && operated == false) {
          buttonRow.push(button.textContent);
          operation['firstNum'].push(button.textContent);

      } else if (button.textContent === 'C') {
          clearLast(buttonRow, operation, operatedWithoutNextValue)
        
      } else if (button.textContent === 'AC') {
          clearAll(buttonRow, operation);

      } else if ('/*-+'.includes(button.textContent)) {
          if ('/*-+'.includes(buttonRow[buttonRow.length-1])) buttonRow.splice(buttonRow.length-1, 1)
          if (operatorNotInRow(button, buttonRow, operation) == true) {
            buttonRow.push(button.textContent);
            operation['operator'] = button.textContent;
            operatedWithoutNextValue == false;
          }

      } else if ('0123456789.'.includes(button.textContent) && operation['operator'] !== undefined) {
          buttonRow.push(button.textContent);
          operation['nextNum'].push(button.textContent);
          operatedWithoutNextValue = false;
      }

        if (button.textContent !== '=') {
          displayInput(buttonRow);
      };
    });
  });


function displayInput (result) {
  
  //check if result is integer with zero-decimals and if so, remove the zero-decimals
  if (result % 1 == 0) result = Math.round(result)
  if (Array.isArray(result)) result = result.join('');
  display.textContent = result;
  console.log(operated)
  

};

function clearLast (buttonRow, operation, operatedWithoutNextValue) {

  if (operation['nextNum'][operation['nextNum'].length-1] === buttonRow[buttonRow.length-1]) {
    operation['nextNum'].splice(operation['nextNum'].length-1, 1)
  } else if (operation['firstNum'][operation['firstNum'].length-1] === buttonRow[buttonRow.length-1]) {
    operation['firstNum'].splice(operation['firstNum'].length-1, 1)
  } else operation['operator'] = undefined;

  buttonRow.splice(buttonRow.length-1, 1);

  if (operatedWithoutNextValue == true) clearAll(buttonRow, operation)

}

function clearAll (buttonRow, operation) {
  buttonRow = buttonRow.splice(0, buttonRow.length);
  operation['firstNum'] = [];
  operation['operator'] = undefined;
  operation['nextNum'] = [];
  operated = false;
  operatedWithoutNextValue = false;

};

function operatorNotInRow (button, buttonRow, operation) {
  for (const item of buttonRow) {
    if ('/*-+'.includes(item)) return false
  } return true

}

function isDecimal(a, b) {
  for (const string of a) {
    if (string == '.') return true
  };
  for (const string of b) {
    if (string == '.') return true
  };
  return false;
};

function add (a, b) {
  return isDecimal(a, b) == true ? (parseFloat(a) + parseFloat(b)).toFixed(2) : parseInt(a) + parseInt(b)
}

function subtract (a, b) {
  return isDecimal(a, b) == true ? (parseFloat(a) - parseFloat(b)).toFixed(2) : parseInt(a) - parseInt(b)
}

function multiply (a, b) {
  return isDecimal(a, b) == true ? (parseFloat(a) * parseFloat(b)).toFixed(2) : parseInt(a) * parseInt(b)
}

function divide (a, b) {
  if (a === '0' && b >= '0') { 
    return "ERROR: Can't divide by zero!"
  } else if (isDecimal(a, b) == true) {
      return (parseFloat(a) / parseFloat(b)).toFixed(2)
  } else return parseInt(a) / parseInt(b)
}

function operate(operation) {

  let result;

  let combineFirst = operation['firstNum'].join('');
  let combineNext = operation['nextNum'].join('');

  switch (operation['operator']) {

    case '+':
      result = add(combineFirst, combineNext);
      break;

    case '-':
      result = subtract(combineFirst, combineNext);
      break;

    case '*':
      result = multiply(combineFirst, combineNext);
      break;
    
    case '/':
      result = divide(combineFirst, combineNext);
      break;
  };

  operation['firstNum'] = [result];
  operation['operator'] = undefined;
  operation['nextNum'] = [];
  operated = true;
  operatedWithoutNextValue = true;
  displayInput(result);
};



