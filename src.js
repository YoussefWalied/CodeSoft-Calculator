class Calculator {
  constructor(previousOperandTextElement, currentOperandtextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandtextElement = currentOperandtextElement
    this.clear()
  }

  clear() {

    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    let result;
    try {
      const prevNumber = parseFloat(this.previousOperand)
      const currentNumber = parseFloat(this.currentOperand)
      if (isNaN(prevNumber) || isNaN(currentNumber)) return;
      if (this.operation === "+") {
        result = prevNumber + currentNumber
      } else if (this.operation === "-") {
        result = prevNumber - currentNumber
      } else if (this.operation === "x") {
        result = prevNumber * currentNumber
      } else if (this.operation === "÷") {
        result = prevNumber / currentNumber
      } else {
        return;
      }
    } catch (e) { }
    this.currentOperand = result;
    this.operation = null
    this.previousOperand = ""
  }

  updateDisplay() {
    this.currentOperandtextElement.innerText = this.currentOperand
    if (this.operation != null) {

      this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = '';
    }
  }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandtextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandtextElement)
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})
operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay()
  })
})

allClearButton.addEventListener("click", button => {
  calculator.clear();
  calculator.updateDisplay();
})

equalsButton.addEventListener("click", button => {
  calculator.compute();
  calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
  calculator.delete();
  calculator.updateDisplay();
})
