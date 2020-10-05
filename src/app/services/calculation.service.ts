import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  constructor() { }

  getAnnualAmountPaidByCompany(
    annualSalary: number,
    annualEmployeeBenefitsCost: number,
    annualDependantBenefitsCost: number,
    percentEmployeeBenefitsPaidByEmployer: number,
    percentDependantBenefitsPaidByEmployer: number,
    numDependants: number
  ): number {
    if (!annualSalary
      || !annualEmployeeBenefitsCost
      || !annualDependantBenefitsCost
      || !percentEmployeeBenefitsPaidByEmployer
      || !percentDependantBenefitsPaidByEmployer
      || !numDependants) {
      return null;
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
    numDependants: number
  ): number {
    if (!annualSalary
      || !annualEmployeeBenefitsCost
      || !annualDependantBenefitsCost
      || !percentEmployeeBenefitsPaidByEmployer
      || !percentDependantBenefitsPaidByEmployer
      || !numDependants) {
      return null;
    }
    return (annualSalary - (annualEmployeeBenefitsCost * (100 - percentEmployeeBenefitsPaidByEmployer) / 100)
      - (numDependants * (annualDependantBenefitsCost * (100 - percentDependantBenefitsPaidByEmployer) / 100)));
  }

  getAnnualCompanyCost(rowData): number {
    let missingData = false;
    const finalCost = rowData.reduce((acc, row) => {
      const companyCost = this.getAnnualAmountPaidByCompany(
        row.annualSalary,
        row.annualEmployeeBenefitsCost,
        row.annualDependantBenefitsCost,
        row.percentEmployeeBenefitsPaidByEmployer,
        row.percentDependantBenefitsPaidByEmployer,
        row.numDependants
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
