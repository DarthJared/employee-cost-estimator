import { TestBed } from '@angular/core/testing'
import { XlsxExcelService } from './xlsx-excel.service'
import { FinancialRowData } from '../data-typing/financial-row-data'
import { ExcelGridData } from '../data-typing/excel-data'
import { SimpleGridService } from './simple-grid.service'
import { DiscountANameCalculationService } from './discount-a-name-calculation.service'

describe('XlsxExcelService', () => {
  let service: XlsxExcelService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: 'ColumnDetailsService', useClass: SimpleGridService },
        { provide: 'DefaultDetailsService', useClass: SimpleGridService },
        {
          provide: 'CalculationService',
          useClass: DiscountANameCalculationService,
        },
      ],
    })
    service = TestBed.inject(XlsxExcelService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should transform imported data from array of arrays to array of objects', () => {
    const MockExcelData: ExcelGridData = [
      [
        'name',
        'numDependants',
        'annualSalary',
        'annualEmployeeBenefitsCost',
        'annualDependantBenefitsCost',
        'percentEmployeeBenefitsPaidByEmployer',
        'percentDependantBenefitsPaidByEmployer',
      ],
      ['Mr. Tester', 1, 100000, 2000, 1000, 1, 0],
      ['Ms. Testing', 2, 150000, 2000, 1000, 1, 0],
    ]
    const tableFormattedData: FinancialRowData[] = service.applyImportedData(
      MockExcelData,
    )
    tableFormattedData.forEach(tableRow => {
      expect(typeof tableRow).toEqual('object')
    })
    expect(tableFormattedData.length).toEqual(2)
  })

  it('should transform imported data from array of arrays to array of objects', () => {
    const MockGridData: FinancialRowData[] = [
      {
        name: 'Mr. Tester',
        numDependants: 1,
        annualSalary: 100000,
        annualEmployeeBenefitsCost: 2000,
        annualDependantBenefitsCost: 1000,
        percentEmployeeBenefitsPaidByEmployer: 1,
        percentDependantBenefitsPaidByEmployer: 0,
      },
      {
        name: 'Ms. Testing',
        numDependants: 2,
        annualSalary: 150000,
        annualEmployeeBenefitsCost: 2000,
        annualDependantBenefitsCost: 1000,
        percentEmployeeBenefitsPaidByEmployer: 1,
        percentDependantBenefitsPaidByEmployer: 0,
      },
    ]
    const excelFormattedData: ExcelGridData = service.getExcelFormatData(
      false,
      MockGridData,
    )
    excelFormattedData.forEach(rowData => {
      expect(typeof rowData).toEqual('object')
    })
    expect(excelFormattedData.length).toEqual(3)
  })

  it('should return 1 row for defaulted download', () => {
    const MockGridData: FinancialRowData[] = [
      {
        name: 'Mr. Tester',
        numDependants: 1,
        annualSalary: 100000,
        annualEmployeeBenefitsCost: 2000,
        annualDependantBenefitsCost: 1000,
        percentEmployeeBenefitsPaidByEmployer: 1,
        percentDependantBenefitsPaidByEmployer: 0,
      },
      {
        name: 'Ms. Testing',
        numDependants: 2,
        annualSalary: 150000,
        annualEmployeeBenefitsCost: 2000,
        annualDependantBenefitsCost: 1000,
        percentEmployeeBenefitsPaidByEmployer: 1,
        percentDependantBenefitsPaidByEmployer: 0,
      },
    ]
    const excelFormattedData: ExcelGridData = service.getExcelFormatData(
      true,
      MockGridData,
    )
    expect(excelFormattedData.length).toEqual(1)
  })
})
