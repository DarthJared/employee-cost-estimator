import { Injectable } from '@angular/core'
import { FinancialRowData } from '../data-typing/financial-row-data'
import { CalculationService } from './calculation.service'

@Injectable({
  providedIn: 'root',
})
export class DiscountANameCalculationService implements CalculationService {
  constructor() {}

  private startsWithA(name: string): boolean {
    return name[0] === 'a' || name[0] === 'A'
  }

  getAnnualAmountPaidByCompany(rowData: FinancialRowData): number {
    if (
      !rowData.annualSalary ||
      !rowData.annualEmployeeBenefitsCost ||
      !rowData.annualDependantBenefitsCost ||
      !rowData.percentEmployeeBenefitsPaidByEmployer ||
      !rowData.percentDependantBenefitsPaidByEmployer ||
      !rowData.numDependants ||
      !rowData.name
    ) {
      /* Return null if any of the required information to calculate the cost is missing */
      return null
    }
    if (this.startsWithA(name)) {
      /* Benefits receive a 10% discount if the employee's name starts with an 'A' */
      rowData.annualEmployeeBenefitsCost *= 0.9
      rowData.annualDependantBenefitsCost *= 0.9
    }
    return (
      rowData.annualSalary +
      (rowData.annualEmployeeBenefitsCost * rowData.percentEmployeeBenefitsPaidByEmployer) /
        100 +
      (rowData.numDependants *
        rowData.annualDependantBenefitsCost *
        rowData.percentDependantBenefitsPaidByEmployer) /
        100
    )
  }

  getAnnualEmployeeSalaryAfterDeductions(rowData: FinancialRowData): number {
    if (
      !rowData.annualSalary ||
      !rowData.annualEmployeeBenefitsCost ||
      !rowData.annualDependantBenefitsCost ||
      !rowData.percentEmployeeBenefitsPaidByEmployer ||
      !rowData.percentDependantBenefitsPaidByEmployer ||
      !rowData.numDependants
    ) {
      /* Return null if any of the required information to calculate the cost is missing */
      return null
    }
    if (this.startsWithA(name)) {
      /* Benefits receive a 10% discount if the employee's name starts with an 'A' */
      rowData.annualEmployeeBenefitsCost *= 0.9
      rowData.annualDependantBenefitsCost *= 0.9
    }
    return (
      rowData.annualSalary -
      (rowData.annualEmployeeBenefitsCost *
        (100 - rowData.percentEmployeeBenefitsPaidByEmployer)) /
        100 -
      rowData.numDependants *
        ((rowData.annualDependantBenefitsCost *
          (100 - rowData.percentDependantBenefitsPaidByEmployer)) /
          100)
    )
  }

  getAnnualCompanyCost(rowData: FinancialRowData[]): number {
    let missingData = false
    const finalCost: number = rowData.reduce((acc, row) => {
      /* Get the cost for each row and sum them up */
      const companyCost = this.getAnnualAmountPaidByCompany(row)
      if (!companyCost) {
        /* If any of the rows are missing data, return null */
        missingData = true
      }
      return acc + companyCost
    }, 0)
    if (missingData) {
      return null
    }
    return finalCost
  }
}
