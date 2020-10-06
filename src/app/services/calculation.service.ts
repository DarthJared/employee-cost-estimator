import { Injectable } from '@angular/core';
import {FinancialRowData} from './financial-row-data';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  constructor() { }

  private startsWithA(name: string): boolean {
    return name[0] === 'a' || name[0] === 'A';
  }

  getAnnualAmountPaidByCompany(
    annualSalary: number,
    annualEmployeeBenefitsCost: number,
    annualDependantBenefitsCost: number,
    percentEmployeeBenefitsPaidByEmployer: number,
    percentDependantBenefitsPaidByEmployer: number,
    numDependants: number,
    name: string
  ): number {
    if (!annualSalary
      || !annualEmployeeBenefitsCost
      || !annualDependantBenefitsCost
      || !percentEmployeeBenefitsPaidByEmployer
      || !percentDependantBenefitsPaidByEmployer
      || !numDependants
      || !name) {
      return null;
    }
    if (this.startsWithA(name)) {
      annualEmployeeBenefitsCost *= 0.9;
      annualDependantBenefitsCost *= 0.9;
    }
    return (annualSalary + (annualEmployeeBenefitsCost * percentEmployeeBenefitsPaidByEmployer / 100)
      + (numDependants * annualDependantBenefitsCost * percentDependantBenefitsPaidByEmployer / 100));
  }

  getAnnualEmployeeSalaryAfterDeductions(
    annualSalary: number,
    annualEmployeeBenefitsCost: number,
    annualDependantBenefitsCost: number,
    percentEmployeeBenefitsPaidByEmployer: number,
    percentDependantBenefitsPaidByEmployer: number,
    numDependants: number,
    name: string
  ): number {
    if (!annualSalary
      || !annualEmployeeBenefitsCost
      || !annualDependantBenefitsCost
      || !percentEmployeeBenefitsPaidByEmployer
      || !percentDependantBenefitsPaidByEmployer
      || !numDependants) {
      return null;
    }
    if (this.startsWithA(name)) {
      annualEmployeeBenefitsCost *= 0.9;
      annualDependantBenefitsCost *= 0.9;
    }
    return (annualSalary - (annualEmployeeBenefitsCost * (100 - percentEmployeeBenefitsPaidByEmployer) / 100)
      - (numDependants * (annualDependantBenefitsCost * (100 - percentDependantBenefitsPaidByEmployer) / 100)));
  }

  getAnnualCompanyCost(rowData: FinancialRowData[]): number {
    let missingData = false;
    const finalCost: number = rowData.reduce((acc, row) => {
      const companyCost = this.getAnnualAmountPaidByCompany(
        row.annualSalary,
        row.annualEmployeeBenefitsCost,
        row.annualDependantBenefitsCost,
        row.percentEmployeeBenefitsPaidByEmployer,
        row.percentDependantBenefitsPaidByEmployer,
        row.numDependants,
        row.name
      );
      if (!companyCost) {
        missingData = true;
      }
      return acc + companyCost;
    }, 0);
    if (missingData) {
      return null;
    }
    return finalCost;
  }
}
