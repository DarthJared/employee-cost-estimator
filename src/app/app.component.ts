import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  employeeName: string;
  numDependents: number;
  income = 2000;
  percentEmployeeBenefitsPaidByEmployer = 100;
  percentDependantBenefitsPaidByEmployer = 50;
  costOfEmployeeToBusiness: string;
  employeePaycheckAmount: string;

  calculateCost(): void {
    this.costOfEmployeeToBusiness = (this.income
      + (1000 * this.percentEmployeeBenefitsPaidByEmployer / 1200)
      + (500 * this.percentDependantBenefitsPaidByEmployer / 1200)).toFixed(2);
    this.employeePaycheckAmount = (this.income
      - (1000 * (100 - this.percentEmployeeBenefitsPaidByEmployer) / 1200)
      - (500 * (100 - this.percentDependantBenefitsPaidByEmployer) / 1200)).toFixed(2);
  }

}
