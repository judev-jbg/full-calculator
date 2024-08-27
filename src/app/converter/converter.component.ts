import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [FormsModule, NgFor, CommonModule],
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.css'
})
export class ConverterComponent {
  inputValue: number = 0;
  convertedValue: string = '';
  fromUnit: string = 'Metro';
  toUnit: string = 'Centímetro';
  units: string[] = ['Kilometro', 'Metro', 'Centímetro', 'Milímetro', 'Milla', 'Yarda', 'Pie', 'Pulgada', 'Milla náutica', 'Micrómetro', 'Nanómetro'];

  convert() {
    // Implementar la lógica de conversión
    this.convertedValue = this.convertUnits(this.inputValue, this.fromUnit, this.toUnit);
  }

  convertUnits(value: number, from: string, to: string): string {
    // Aquí debes agregar la lógica para convertir entre unidades
    // Por simplicidad, retorna el mismo valor para todos
    return `Resultado: ${value} ${from} en ${to}`;
  }
}
