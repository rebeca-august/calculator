const numberButtons = document.querySelectorAll("[data=number]");
const operationButtons = document.querySelectorAll("[data=operation]");
const equalsButton = document.querySelector("[data=equals]");
const allClearButton = document.querySelector("[data=all-clear]");
const display = document.querySelector(".display");

const Calculator = {
    init() {
        window.addEventListener("keydown", function (e) {

        });

        for (const button of numberButtons) {
            button.addEventListener("click", () => {
                const value = button.innerText;

                if (this.operation) {
                    this.setSecondOperand(value);
                } else if (this.result) {
                    this.resetCalculator();
                    this.setFirstOperand(value);
                } else {
                    this.setFirstOperand(value);
                }
            });

        }

        for (const operation of operationButtons) {
            operation.addEventListener("click", () => {
                if (this.operation) {
                    this.calculate();
                    this.firstOperand = this.result;
                    this.secondOperand = "0";
                }
                this.setOperation(operation.innerText);
            });
        }

        allClearButton.addEventListener("click", () => this.resetCalculator());

        equalsButton.addEventListener("click", () => {
            this.calculate();
            this.operation = null;
            this.firstOperand = this.result;
            this.secondOperand = "0";
        });

        this.appendToDisplay(this.firstOperand);
    },

    firstOperand: "0",
    secondOperand: "0",
    operation: null,
    result: null,

    setFirstOperand(value) {
        if (value === "." && this.firstOperand.includes(".")) {
            return;
        }
        if (this.firstOperand === "0" && value !== ".") {
            this.firstOperand = value;
        } else {
            this.firstOperand = `${this.firstOperand}${value}`;
        }
        this.appendToDisplay(this.firstOperand);
    },

    setSecondOperand(value) {
        if (value === "." && this.secondOperand.includes(".")) {
            return;
        }
        if (this.secondOperand === "0" && value !== ".") {
            this.secondOperand = value;
        } else {
            this.secondOperand = `${this.secondOperand}${value}`;
        }
        this.appendToDisplay(this.secondOperand);
    },

    setOperation(value) {
        this.operation = value;
    },

    calculate() {
        const firstOperand = Number(this.firstOperand);
        const secondOperand = Number(this.secondOperand);
        let result = 0;

        switch (this.operation) {
            case "+":
                result = firstOperand + secondOperand;
                break;
            case "-":
                result = firstOperand - secondOperand;
                break;
            case "x":
                result = firstOperand * secondOperand;
                break;
            case "÷":
                result = firstOperand / secondOperand;
                break;
            default:
                throw new Error("Unknown operation");
        }
        this.result = result.toFixed(3);
        this.appendToDisplay(this.result);
    },

    resetCalculator() {
        this.firstOperand = "0";
        this.secondOperand = "0";
        this.operation = null;
        this.result = null;
        this.appendToDisplay(this.firstOperand);
    },

    appendToDisplay(value) {
        display.innerText = value;
    },
};


