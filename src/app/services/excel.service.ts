import { FinancialRowData } from '../data-typing/financial-row-data'

export interface ExcelService {
  readExcelData(evt, callback): void
  downloadData(template: boolean, currentGridData: FinancialRowData[]): void
}
