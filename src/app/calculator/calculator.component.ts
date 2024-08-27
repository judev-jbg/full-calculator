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

  currentInput: string = '';
  result: string = '';

  append(value: string) {
    this.currentInput += value;
  }

  clear() {
    this.currentInput = '';
    this.result = '';
  }

  calculate() {
    try {
      this.result = evaluate(this.currentInput);
    } catch (error) {
      this.result = 'Error';
    }
  }

}
