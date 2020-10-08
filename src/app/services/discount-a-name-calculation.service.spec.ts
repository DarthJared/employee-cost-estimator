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
      accCost += service.getAnnualAmountPaidByCompany(rowData)
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
      MockRowWithoutDependants,
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
      MockRowWithoutDependants,
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
      percentEmployeeBenefitsPaidByEmployer: 12,
      percentDependantBenefitsPaidByEmployer: 4,
    }
    const rowNameDoesntStartWithA: FinancialRowData = {
      name: 'Mr. Tester',
      numDependants: 1,
      annualSalary: 100000,
      annualEmployeeBenefitsCost: 2000,
      annualDependantBenefitsCost: 1000,
      percentEmployeeBenefitsPaidByEmployer: 12,
      percentDependantBenefitsPaidByEmployer: 4,
    }
    const paidByCompanyDiscounted: number = service.getAnnualAmountPaidByCompany(
      rowNameStartsWithA,
    )
    const paidByCompanyNormal: number = service.getAnnualAmountPaidByCompany(
      rowNameDoesntStartWithA,
    )

    const employeeSalaryDiscounted: number = service.getAnnualEmployeeSalaryAfterDeductions(
      rowNameStartsWithA,
    )
    const employeeSalaryNormal: number = service.getAnnualEmployeeSalaryAfterDeductions(
      rowNameDoesntStartWithA,
    )

    const expectedDiscountedCompanyCost: number =
      paidByCompanyNormal -
      (0.1 *
        (rowNameDoesntStartWithA.percentEmployeeBenefitsPaidByEmployer *
          rowNameDoesntStartWithA.annualEmployeeBenefitsCost +
          rowNameDoesntStartWithA.percentDependantBenefitsPaidByEmployer *
            rowNameDoesntStartWithA.annualDependantBenefitsCost *
            rowNameDoesntStartWithA.numDependants)) /
        100

    const expectedDiscountedSalary: number =
      employeeSalaryNormal +
      (0.1 *
        ((100 - rowNameDoesntStartWithA.percentEmployeeBenefitsPaidByEmployer) *
          rowNameDoesntStartWithA.annualEmployeeBenefitsCost +
          (100 -
            rowNameDoesntStartWithA.percentDependantBenefitsPaidByEmployer) *
            rowNameDoesntStartWithA.annualDependantBenefitsCost *
            rowNameDoesntStartWithA.numDependants)) /
        100

    expect(expectedDiscountedCompanyCost).toEqual(paidByCompanyDiscounted)
    expect(expectedDiscountedSalary).toEqual(employeeSalaryDiscounted)
  })
})
