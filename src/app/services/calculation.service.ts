import { FinancialRowData } from '../data-typing/financial-row-data'

export interface CalculationService {
  getAnnualAmountPaidByCompany(rowData: FinancialRowData): number

  getAnnualEmployeeSalaryAfterDeductions(rowData: FinancialRowData): number

  getAnnualCompanyCost(rowData: FinancialRowData[]): number
}
