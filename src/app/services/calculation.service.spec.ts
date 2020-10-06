import { TestBed } from '@angular/core/testing';

import { CalculationService } from './calculation.service';

describe('CalculationService', () => {
  let service: CalculationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAnnualCompanyCost should be the sum of all getAnnualAmountPaidByCompany', () => {
    const MockGridData = [
      {
        name: 'Mr. Tester',
        numDependants: 1,
        annualSalary: 100000,
        annualEmployeeBenefitsCost: 2000,
        annualDependantBenefitsCost: 1000,
        percentEmployeeBenefitsPaidByEmployer: 10,
        percentDependantBenefitsPaidByEmployer: 5
      },
      {
        name: 'Ms. Testing',
        numDependants: 2,
        annualSalary: 150000,
        annualEmployeeBenefitsCost: 2000,
        annualDependantBenefitsCost: 1000,
        percentEmployeeBenefitsPaidByEmployer: 10,
        percentDependantBenefitsPaidByEmployer: 5
      }
    ];
    let accCost = 0;
    MockGridData.forEach((rowData) => {
      accCost += service.getAnnualAmountPaidByCompany(
        rowData.annualSalary,
        rowData.annualEmployeeBenefitsCost,
        rowData.annualDependantBenefitsCost,
        rowData.percentEmployeeBenefitsPaidByEmployer,
        rowData.percentDependantBenefitsPaidByEmployer,
        rowData.numDependants,
        rowData.name
      );
    });
    const annualCost = service.getAnnualCompanyCost(MockGridData);
    expect(accCost).toEqual(annualCost);
  });
});
