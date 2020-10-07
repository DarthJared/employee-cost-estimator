import { TestBed } from '@angular/core/testing'
import { SimpleGridService } from './simple-grid.service'
import {
  ColDef,
  ValueFormatterParams,
  ValueGetterParams,
  ValueParserParams,
} from 'ag-grid-community'
import { DiscountANameCalculationService } from './discount-a-name-calculation.service'

describe('SimpleGridService', () => {
  let service: SimpleGridService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: 'CalculationService',
          useClass: DiscountANameCalculationService,
        },
      ],
    })
    service = TestBed.inject(SimpleGridService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('number columns should always be a number', () => {
    const cols: ColDef[] = service.getColumnDefs()
    const MockNumEntry = { newValue: 1 } as ValueParserParams
    const MockStrEntry = { newValue: '1' } as ValueParserParams
    const MockNanEntry = { newValue: 'abc' } as ValueParserParams
    cols.forEach(col => {
      if (col.field && col.field !== 'name') {
        const valueParser = col.valueParser as (
          params: ValueParserParams,
        ) => any
        const numRes: number = valueParser(MockNumEntry)
        const strRes: number = valueParser(MockStrEntry)
        const nanRes: number = valueParser(MockNanEntry)

        expect(typeof numRes).toEqual('number')
        expect(typeof strRes).toEqual('number')
        expect(numRes).toEqual(strRes)
        expect(nanRes).toBeNaN()
      }
    })
  })

  it('placeholder should only return when no value is present', () => {
    const nameCol: ColDef = service.getColumnDefs()[1]
    const MockValParams = { value: 1 } as ValueFormatterParams
    const MockNoValParams = {} as ValueFormatterParams
    const valueFormatter = nameCol.valueFormatter as (
      params: ValueFormatterParams,
    ) => string
    const valExists = valueFormatter(MockValParams)
    const noVal = valueFormatter(MockNoValParams)
    expect(typeof valExists).toEqual('number')
    expect(typeof noVal).toEqual('string')
  })

  it('dollarAmountDisplay should return the correctly truncated values', () => {
    const cols: ColDef[] = service.getColumnDefs()

    cols.forEach(col => {
      if (!col.field && col.headerName !== '') {
        const MockParamsDecimalVal = { value: 99.9901 } as ValueFormatterParams
        const MockParamsWholeVal = { value: 100 } as ValueFormatterParams
        const MockParamsNoVal = {} as ValueFormatterParams
        const valueFormatter = col.valueFormatter as (
          params: ValueFormatterParams,
        ) => string
        const decRes: string = valueFormatter(MockParamsDecimalVal)
        const wholeRes: string = valueFormatter(MockParamsWholeVal)
        const noValRes: string = valueFormatter(MockParamsNoVal)
        expect(decRes.split('.')[1].length).toEqual(2)
        expect(wholeRes.split('.')[1].length).toEqual(2)
        expect(noValRes.indexOf('.')).toEqual(-1)
      }
    })
  })

  it('Bi-Weekly Company Cost should be 1/26th Annual Company Cost', () => {
    let biweeklyCompanyCost: number
    let annualCompanyCost: number
    const MockParams = {
      data: {
        annualSalary: 100000,
        annualEmployeeBenefitsCost: 2000,
        annualDependantBenefitsCost: 1000,
        percentEmployeeBenefitsPaidByEmployer: 27,
        percentDependantBenefitsPaidByEmployer: 13.5,
        numDependants: 3,
        name: 'Mr. Test',
      },
    } as ValueGetterParams
    const cols = service.getColumnDefs()
    cols.forEach(col => {
      const valueGetter = col.valueGetter as (params: ValueGetterParams) => any
      if (col.headerName === 'Bi-Weekly Company Cost') {
        biweeklyCompanyCost = valueGetter(MockParams)
      }
      if (col.headerName === 'Annual Company Cost') {
        annualCompanyCost = valueGetter(MockParams)
      }
    })
    expect(biweeklyCompanyCost * 26).toEqual(annualCompanyCost)
  })

  it('Bi-Weekly Salary After Deductions should be 1/26th Annual Salary After Deductions', () => {
    let biweeklySalary: number
    let annualSalary: number
    const MockParams = {
      data: {
        annualSalary: 100000,
        annualEmployeeBenefitsCost: 2000,
        annualDependantBenefitsCost: 1000,
        percentEmployeeBenefitsPaidByEmployer: 27,
        percentDependantBenefitsPaidByEmployer: 13.5,
        numDependants: 3,
        name: 'Mr. Test',
      },
    } as ValueGetterParams
    const cols: ColDef[] = service.getColumnDefs()
    cols.forEach(col => {
      const valueGetter = col.valueGetter as (params: ValueGetterParams) => any
      if (col.headerName === 'Bi-Weekly Salary After Deductions') {
        biweeklySalary = valueGetter(MockParams)
      }
      if (col.headerName === 'Annual Salary After Deductions') {
        annualSalary = valueGetter(MockParams)
      }
    })
    expect(biweeklySalary * 26).toEqual(annualSalary)
  })
})
