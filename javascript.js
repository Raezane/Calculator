function main () {

  const display = document.querySelector('#display')
  const allButtons = document.querySelectorAll('button');

  let buttonRow = [];

  allButtons.forEach((button) => {
    button.addEventListener('click', () => {
      //check if 'C', 'AC' or any of the operators is not the button clicked,
      //and only then add to buttonRow-array
      if (!('ACA=/*-+'.includes(button.textContent))) {
        buttonRow.push(button.textContent)
      } else if (button.textContent === 'C') {
        buttonRow.splice(buttonRow.length-1, 1)
      } else if (button.textContent === 'AC') {
        buttonRow = [];
      }
      displayInput(buttonRow)
    });
  });
};


function displayInput (buttonRow) {
    
    display.textContent = buttonRow.join('')

}

function add (a, b) {

}

function subtract (a, b) {
    
}

function multiply (a, b) {
    
}

function divide (a, b) {
    
}

function operate(firstNum, operator, nextNum) {

}


main()