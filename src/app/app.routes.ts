import { Routes } from '@angular/router';
import { CalculatorComponent } from './calculator/calculator.component';
import { ConverterComponent } from './converter/converter.component';

export const routes: Routes = [
    { path: 'calculator', component: CalculatorComponent },
    { path: 'converter', component: ConverterComponent },
    { path: '', redirectTo: '/calculator', pathMatch: 'full' }
];
