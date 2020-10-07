import { TestBed } from '@angular/core/testing'
import { DiscountANameCalculationService } from './discount-a-name-calculation.service'
import { FinancialRowData } from '../data-typing/financial-row-data'

describe('DiscountANameCalculationService', () => {
  let service: DiscountANameCalculationService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(DiscountANameCalculationService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('getAnnualCompanyCost should be the sum of all getAnnualAmountPaidByCompany', () => {
    const MockGridData: FinancialRowData[] = [
      {
        name: 'Mr. Tester',
        numDependants: 1,
        annualSalary: 100000,
        annualEmployeeBenefitsCost: 2000,
        annualDependantBenefitsCost: 1000,
        percentEmployeeBenefitsPaidByEmployer: 10,
        percentDependantBenefitsPaidByEmployer: 5,
      },
      {
        name: 'Ms. Testing',
        numDependants: 2,
        annualSalary: 150000,
        annualEmployeeBenefitsCost: 2000,
        annualDependantBenefitsCost: 1000,
        percentEmployeeBenefitsPaidByEmployer: 10,
        percentDependantBenefitsPaidByEmployer: 5,
      },
    ]
    let accCost = 0
    MockGridData.forEach(rowData => {
      accCost += service.getAnnualAmountPaidByCompany(
        rowData.annualSalary,
        rowData.annualEmployeeBenefitsCost,
        rowData.annualDependantBenefitsCost,
        rowData.percentEmployeeBenefitsPaidByEmployer,
        rowData.percentDependantBenefitsPaidByEmployer,
        rowData.numDependants,
        rowData.name,
      )
    })
    const annualCost: number = service.getAnnualCompanyCost(MockGridData)
    expect(accCost).toEqual(annualCost)
  })

  it('getAnnualAmountPaidByCompany should return null if missing data', () => {
    const MockRowWithoutDependants: FinancialRowData = {
      name: 'Mr. Tester',
      numDependants: null,
      annualSalary: 100000,
      annualEmployeeBenefitsCost: 2000,
      annualDependantBenefitsCost: 1000,
      percentEmployeeBenefitsPaidByEmployer: 10,
      percentDependantBenefitsPaidByEmployer: 5,
    }
    const nullRes: number = service.getAnnualAmountPaidByCompany(
      MockRowWithoutDependants.annualSalary,
      MockRowWithoutDependants.annualEmployeeBenefitsCost,
      MockRowWithoutDependants.annualDependantBenefitsCost,
      MockRowWithoutDependants.percentEmployeeBenefitsPaidByEmployer,
      MockRowWithoutDependants.percentDependantBenefitsPaidByEmployer,
      MockRowWithoutDependants.numDependants,
      MockRowWithoutDependants.name,
    )
    expect(nullRes).toBeNull()
  })

  it('getAnnualEmployeeSalaryAfterDeductions should return null if missing data', () => {
    const MockRowWithoutDependants: FinancialRowData = {
      name: 'Mr. Tester',
      numDependants: null,
      annualSalary: 100000,
      annualEmployeeBenefitsCost: 2000,
      annualDependantBenefitsCost: 1000,
      percentEmployeeBenefitsPaidByEmployer: 10,
      percentDependantBenefitsPaidByEmployer: 5,
    }
    const nullRes: number = service.getAnnualEmployeeSalaryAfterDeductions(
      MockRowWithoutDependants.annualSalary,
      MockRowWithoutDependants.annualEmployeeBenefitsCost,
      MockRowWithoutDependants.annualDependantBenefitsCost,
      MockRowWithoutDependants.percentEmployeeBenefitsPaidByEmployer,
      MockRowWithoutDependants.percentDependantBenefitsPaidByEmployer,
      MockRowWithoutDependants.numDependants,
      MockRowWithoutDependants.name,
    )
    expect(nullRes).toBeNull()
  })

  it('getAnnualCompanyCost should return null if missing data', () => {
    const MockRowsMissingData: FinancialRowData[] = [
      {
        name: 'Mr. Tester',
        numDependants: null,
        annualSalary: 100000,
        annualEmployeeBenefitsCost: 2000,
        annualDependantBenefitsCost: 1000,
        percentEmployeeBenefitsPaidByEmployer: 10,
        percentDependantBenefitsPaidByEmployer: 5,
      },
      {
        name: 'Ms. Testing',
        numDependants: 2,
        annualSalary: 150000,
        annualEmployeeBenefitsCost: 2000,
        annualDependantBenefitsCost: 1000,
        percentEmployeeBenefitsPaidByEmployer: 10,
        percentDependantBenefitsPaidByEmployer: 5,
      },
    ]
    const nullRes: number = service.getAnnualCompanyCost(MockRowsMissingData)
    expect(nullRes).toBeNull()
  })

  it('should give 10% discount on benefits if name starts with "A"', () => {
    const rowNameStartsWithA: FinancialRowData = {
      name: 'Awesome Tester',
      numDependants: 1,
      annualSalary: 100000,
      annualEmployeeBenefitsCost: 2000,
      annualDependantBenefitsCost: 1000,
      percentEmployeeBenefitsPaidByEmployer: 10,
      percentDependantBenefitsPaidByEmployer: 5,
    }
    const rowNameDoesntStartWithA: FinancialRowData = {
      name: 'Mr. Tester',
      numDependants: 1,
      annualSalary: 100000,
      annualEmployeeBenefitsCost: 2000,
      annualDependantBenefitsCost: 1000,
      percentEmployeeBenefitsPaidByEmployer: 10,
      percentDependantBenefitsPaidByEmployer: 5,
    }
    const paidByCompanyDiscounted: number = service.getAnnualAmountPaidByCompany(
      rowNameStartsWithA.annualSalary,
      rowNameStartsWithA.annualEmployeeBenefitsCost,
      rowNameStartsWithA.annualDependantBenefitsCost,
      rowNameStartsWithA.percentEmployeeBenefitsPaidByEmployer,
      rowNameStartsWithA.percentDependantBenefitsPaidByEmployer,
      rowNameStartsWithA.numDependants,
      rowNameStartsWithA.name,
    )
    const paidByCompanyNormal: number = service.getAnnualAmountPaidByCompany(
      rowNameDoesntStartWithA.annualSalary,
      rowNameDoesntStartWithA.annualEmployeeBenefitsCost,
      rowNameDoesntStartWithA.annualDependantBenefitsCost,
      rowNameDoesntStartWithA.percentEmployeeBenefitsPaidByEmployer,
      rowNameDoesntStartWithA.percentDependantBenefitsPaidByEmployer,
      rowNameDoesntStartWithA.numDependants,
      rowNameDoesntStartWithA.name,
    )

    const employeeSalaryDiscounted: number = service.getAnnualEmployeeSalaryAfterDeductions(
      rowNameStartsWithA.annualSalary,
      rowNameStartsWithA.annualEmployeeBenefitsCost,
      rowNameStartsWithA.annualDependantBenefitsCost,
      rowNameStartsWithA.percentEmployeeBenefitsPaidByEmployer,
      rowNameStartsWithA.percentDependantBenefitsPaidByEmployer,
      rowNameStartsWithA.numDependants,
      rowNameStartsWithA.name,
    )
    const employeeSalaryNormal: number = service.getAnnualEmployeeSalaryAfterDeductions(
      rowNameDoesntStartWithA.annualSalary,
      rowNameDoesntStartWithA.annualEmployeeBenefitsCost,
      rowNameDoesntStartWithA.annualDependantBenefitsCost,
      rowNameDoesntStartWithA.percentEmployeeBenefitsPaidByEmployer,
      rowNameDoesntStartWithA.percentDependantBenefitsPaidByEmployer,
      rowNameDoesntStartWithA.numDependants,
      rowNameDoesntStartWithA.name,
    )

    expect(
      paidByCompanyNormal -
        (0.1 *
          (rowNameStartsWithA.percentEmployeeBenefitsPaidByEmployer *
            rowNameStartsWithA.annualEmployeeBenefitsCost +
            rowNameStartsWithA.percentDependantBenefitsPaidByEmployer *
              rowNameStartsWithA.numDependants *
              rowNameStartsWithA.annualDependantBenefitsCost)) /
          100,
    ).toEqual(paidByCompanyDiscounted)

    expect(
      employeeSalaryNormal +
        (0.1 *
          ((100 - rowNameStartsWithA.percentEmployeeBenefitsPaidByEmployer) *
            rowNameStartsWithA.annualEmployeeBenefitsCost +
            (100 - rowNameStartsWithA.percentDependantBenefitsPaidByEmployer) *
              rowNameStartsWithA.numDependants *
              rowNameStartsWithA.annualDependantBenefitsCost)) /
          100,
    ).toEqual(employeeSalaryDiscounted)
  })
})
