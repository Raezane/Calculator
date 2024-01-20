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

  addListeners();

  function addListeners () {

  window.addEventListener('keydown', clickOrPress)

  allButtons.forEach((button) => {
    button.addEventListener('click', clickOrPress)
  });


};

  function clickOrPress(e) {

    console.log(e);
    let choice;

    switch(e.type) {
      case 'click':
        choice = e.target.textContent
        
        getInput(choice)  
        break;

      case 'keydown':
        choice = e.key;

        getInput(choice)  
        break;
    };
  };

    function getInput(choice) {
  
      if ((choice === '=' || choice === 'Enter' ) && ((operation['firstNum'].length > 0 || Array.isArray(operation['firstNum']) == false)
      && operation['operator'] !== undefined && operation['nextNum'].length > 0)) {
        operate(operation);
        buttonRow.splice(0, buttonRow.length, operation['firstNum']);

      } else if ('0123456789'.includes(choice) && operation['nextNum'].length == 0
       && operation['operator'] == undefined && operated == false) {
          buttonRow.push(choice);
          operation['firstNum'].push(choice);

      } else if (choice === 'C'|| choice === 'c' || choice === 'Backspace') {
          clearLast(buttonRow, operation, operatedWithoutNextValue)
        
      } else if (choice === 'AC' || choice === 'Delete') {
          clearAll(buttonRow, operation);

      } else if ('/*-+'.includes(choice)) {
          if ('/*-+'.includes(buttonRow[buttonRow.length-1])) buttonRow.splice(buttonRow.length-1, 1)
          if (operatorNotInRow(choice, buttonRow, operation) == true) {
            buttonRow.push(choice);
            operation['operator'] = choice;
            operatedWithoutNextValue == false;
          }

      } else if ('0123456789'.includes(choice) && operation['operator'] !== undefined) {
          buttonRow.push(choice);
          operation['nextNum'].push(choice);
          operatedWithoutNextValue = false;
      
      } else if ('.,'.includes(choice)) {
          if (dotNotInRow(operation['firstNum'], '.') && (operation['operator'] == undefined
            || operation['nextNum'].length == 0)) {
                operation['firstNum'].push('.');
                buttonRow.push('.');
          } else if (dotNotInRow(operation['nextNum'], '.') && (operation['operator'] !== undefined
            || operation['nextNum'].length !== 0)) {
                operation['nextNum'].push('.');
                buttonRow.push('.');
          };
      };
      
        if (choice !== '=' || choice === 'Enter') {
          displayInput(buttonRow);
      };
    }
    
function displayInput (result) {
  
  //check if result is integer with zero-decimals and if so, remove the zero-decimals
  if (result % 1 == 0) result = Math.round(result)
  if (Array.isArray(result)) result = result.join('');
  display.textContent = result;
};

function clearLast (buttonRow, operation, operatedWithoutNextValue) {

  if (operation['nextNum'][operation['nextNum'].length-1] === buttonRow[buttonRow.length-1]) {
    operation['nextNum'].splice(operation['nextNum'].length-1, 1)
  } else if (operation['firstNum'][operation['firstNum'].length-1] === buttonRow[buttonRow.length-1]) {
    operation['firstNum'].splice(operation['firstNum'].length-1, 1)
  } else operation['operator'] = undefined;

  buttonRow.splice(buttonRow.length-1, 1);

  if (operatedWithoutNextValue == true) clearAll(buttonRow, operation)
};

function clearAll (buttonRow, operation) {
  buttonRow = buttonRow.splice(0, buttonRow.length);
  operation['firstNum'] = [];
  operation['operator'] = undefined;
  operation['nextNum'] = [];
  operated = false;
  operatedWithoutNextValue = false;

};

function dotNotInRow (operation, choice) {
  if (!(operation.includes(choice))) {
    return true
  };
};

function operatorNotInRow (button, buttonRow, operation) {
  for (const item of buttonRow) {
    if ('/*-+'.includes(item)) return false
  } return true

};

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
};

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