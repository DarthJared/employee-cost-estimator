import { FinancialRowData } from '../data-typing/financial-row-data'

export interface CalculationService {
  getAnnualAmountPaidByCompany(
    annualSalary: number,
    annualEmployeeBenefitsCost: number,
    annualDependantBenefitsCost: number,
    percentEmployeeBenefitsPaidByEmployer: number,
    percentDependantBenefitsPaidByEmployer: number,
    numDependants: number,
    name: string,
  ): number

  getAnnualEmployeeSalaryAfterDeductions(
    annualSalary: number,
    annualEmployeeBenefitsCost: number,
    annualDependantBenefitsCost: number,
    percentEmployeeBenefitsPaidByEmployer: number,
    percentDependantBenefitsPaidByEmployer: number,
    numDependants: number,
    name: string,
  ): number

  getAnnualCompanyCost(rowData: FinancialRowData[]): number
}
