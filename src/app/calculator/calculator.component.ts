import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { evaluate } from 'mathjs'; // Importar la función evaluate de math.js

@Component({
  selector: 'app-calculator',
  imports:[FormsModule,CommonModule],
  standalone: true,
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {


  expression = '';  // Nueva propiedad para almacenar la expresión
  result = '';     // Propiedad para el resultado

  firstOperand: number | null = null;
  operator: string | null = null;
  waitingForSecondOperand = false;

  inputDigit(digit: number) {
    if (this.waitingForSecondOperand) {
      this.result = String(digit);
      this.waitingForSecondOperand = false;
    } else {
      this.result = this.result === '' ? String(digit) : this.result + digit;
    }
    this.expression += digit;  // Agregar dígito a la expresión
  }

  inputDecimal(dot: string) {
    if (this.waitingForSecondOperand) {
      this.result = '0.';
      this.waitingForSecondOperand = false;
      return;
    }

    if (!this.result.includes(dot)) {
      this.result += dot;
    }
    this.expression += dot;  // Agregar punto decimal a la expresión
  }

  clear() {
    this.result = '';
    this.expression = '';  // Limpiar la expresión también
    this.firstOperand = 0;
    this.operator = null;
    this.waitingForSecondOperand = false;
  }
  backspace() {
    this.expression = this.expression.substring(0, this.expression.length - 1) ;  // Limpiar el ultimo caracter
  }
  showAllAdvancedOperation(){

  }

  performOperation(nextOperator: string) {
    const inputValue = parseFloat(this.result);

    if (this.firstOperand === null && !isNaN(inputValue)) {
      this.firstOperand = inputValue;
    } else if (this.operator) {
      const result = this.calculate(this.firstOperand!, inputValue, this.operator);
      this.result = String(result);
      this.firstOperand = result;
    }

    this.operator = nextOperator;
    this.waitingForSecondOperand = true;
    this.expression += `${nextOperator}`;  // Agregar operador a la expresión
  }

  performAdvancedOperation(operation: string) {
    // Lógica para las operaciones avanzadas
    let inputValue = parseFloat(this.result);
    let result;

    switch (operation) {
      case '%':
        result = inputValue / 100;
        break;
      case '√':
        result = Math.sqrt(inputValue);
        break;
      case '^':
        result = Math.pow(this.firstOperand || 0, inputValue);
        break;
      case 'sin':
        result = Math.sin(inputValue);
        break;
      case 'cos':
        result = Math.cos(inputValue);
        break;
      case 'tan':
        result = Math.tan(inputValue);
        break;
      case 'e':
        result = Math.exp(inputValue);
        break;
      default:
        return;
    }

    this.result = String(result);
    this.expression = `${operation}(${inputValue})`;  // Actualizar la expresión
  }

  calculateResult() {
    if (this.firstOperand === null || this.operator === null) return;

    const inputValue = parseFloat(this.result);
    const result = this.calculate(this.firstOperand, inputValue, this.operator);

    this.result = String(result);
    this.firstOperand = null;
    this.operator = null;
    this.waitingForSecondOperand = false;
  }

  private calculate(firstOperand: number, secondOperand: number, operator: string): number {
    switch (operator) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '*':
        return firstOperand * secondOperand;
      case '/':
        return secondOperand !== 0 ? firstOperand / secondOperand : 0;
      default:
        return secondOperand;
    }
  }

}
