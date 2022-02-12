const calculator_result_document_id = "calculator_result";
const local_storage_calculation_history_key = "calculation_history";
class Calculation {
  firstInput;
  secondInput;
  operator;
  result;
  constructor(firstInput, secondInput, operator, result) {
    this.firstInput = firstInput;
    this.secondInput = secondInput;
    this.operator = operator;
    this.result = result;
  }
}
function Calculator() {
  this.operator = "";
  this.firstInput = -1;
  this.secondInput = -1;
}
function CalculationHistory() {}

/**
 * @param {string} value button node value.
 */
Calculator.prototype.buttonOnClick = function (value) {
  try {
    const currentValue = this.getResultValue();
    if (currentValue !== 0) {
      const addedValue = currentValue * 10 + Number.parseFloat(value);
      this.setValue(addedValue);
    } else {
      const buttonValue = Number.parseFloat(value);
      this.setValue(buttonValue);
    }
  } catch (error) {
    alert("Error Occured");
  }
};

/**
 * @param {number} value sets results value.
 */
Calculator.prototype.setValue = function (value) {
  const resultDoc = document.getElementById(calculator_result_document_id);
  resultDoc.childNodes[0].nodeValue = value;
};

/**
 * @param {string} operator
 */
Calculator.prototype.operatorOnClick = function (operator) {
  switch (operator) {
    case "*":
      this.operator = "*";
      break;

    case "/":
      this.operator = "/";
      break;

    case "+":
      this.operator = "+";
      break;

    case "-":
      this.operator = "-";
      break;

    default:
      alert("Error Occured");
      return;
  }
  // Get The First Input When Pressing Result Value
  this.firstInput = this.getResultValue();
  this.setValue(0);
};

/**
 * calculate result value according to the inputs.
 */
Calculator.prototype.calculate = function () {
  const currentValue = this.getResultValue();
  const historyInstance = new CalculationHistory();
  this.secondInput = currentValue;

  if (this.firstInput !== -1 && this.secondInput !== -1) {
    if (this.operator === "*") {
      const value = this.firstInput * this.secondInput;
      this.setValue(value);
      const calculation = new Calculation(
        this.firstInput,
        this.secondInput,
        this.operator,
        value
      );
      historyInstance.setItem(calculation);
      // Set Result as Next Input
      this.firstInput = value;
    }
    if (this.operator === "/") {
      const value = this.firstInput / this.secondInput;
      this.setValue(value);
      const calculation = new Calculation(
        this.firstInput,
        this.secondInput,
        this.operator,
        value
      );
      historyInstance.setItem(calculation);
      // Set Result as Next Input
      this.firstInput = value;
    }
    if (this.operator === "+") {
      const value = this.firstInput + this.secondInput;
      this.setValue(value);
      const calculation = new Calculation(
        this.firstInput,
        this.secondInput,
        this.operator,
        value
      );
      historyInstance.setItem(calculation);
      // Set Result as Next Input
      this.firstInput = value;
    }
    if (this.operator === "-") {
      const value = this.firstInput - this.secondInput;
      this.setValue(value);
      const calculation = new Calculation(
        this.firstInput,
        this.secondInput,
        this.operator,
        value
      );
      historyInstance.setItem(calculation);
      // Set Result as Next Input
      this.firstInput = value;
    }
  }
};

/**
 * clears result value.
 */
Calculator.prototype.clear = function () {
  const resultDoc = document.getElementById(calculator_result_document_id);
  this.firstInput = -1;
  this.secondInput = -1;
  this.operator = "";
  resultDoc.childNodes[0].nodeValue = "0";
};

/**
 * @returns the result value.
 */
Calculator.prototype.getResultValue = function () {
  const htmlElement = document.getElementById(calculator_result_document_id);
  return Number.parseFloat(htmlElement.childNodes[0].nodeValue);
};

/**
 *
 * @param {Calculation} calculation
 */
CalculationHistory.prototype.setItem = function (calculation) {
  const history = this.getHistory();

  history.push(calculation);
  window.localStorage.setItem(
    local_storage_calculation_history_key,
    JSON.stringify(history)
  );

  document.getElementById("history_data").childNodes[0].nodeValue = history
    .map((e) => {
      return `[${e.firstInput}${e.operator}${e.secondInput}=${e.result}]   `;
    })
    .join("\n");
};

CalculationHistory.prototype.getHistory = function () {
  const data = window.localStorage.getItem(
    local_storage_calculation_history_key
  );
  if (data) {
    return JSON.parse(data);
  }
  return [];
};

CalculationHistory.prototype.setCalculationsLastDate = function () {};
