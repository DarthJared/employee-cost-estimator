import { TestBed } from '@angular/core/testing';

import { GridService } from './grid.service';

describe('GridService', () => {
  let service: GridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('number columns should always be a number', () => {
    const cols = service.getColumnDefs();
    const MockNumEntry = {newValue: 1};
    const MockStrEntry = {newValue: '1'};
    const MockNanEntry = {newValue: 'abc'};
    cols.forEach((col) => {
      if (col.field && col.field !== 'name') {
        const numRes = col.valueParser(MockNumEntry);
        const strRes = col.valueParser(MockStrEntry);
        const nanRes = col.valueParser(MockNanEntry);

        expect(typeof numRes).toEqual('number');
        expect(typeof strRes).toEqual('number');
        expect(numRes).toEqual(strRes);
        expect(nanRes).toBeNaN();
      }
    });
  });

  it('placeholder should only return when no value is present', () => {
    const nameCol = service.getColumnDefs()[1];
    const MockValParams = {value: 1};
    const MockNoValParams = {};
    const valExists = nameCol.valueFormatter(MockValParams);
    const noVal = nameCol.valueFormatter(MockNoValParams);
    expect(typeof valExists).toEqual('number');
    expect(typeof noVal).toEqual('string');
    expect(valExists).toEqual(1);
  });

  it('dollarAmountDisplay should return the correctly truncated values', () => {
    const cols = service.getColumnDefs();

    cols.forEach((col) => {
      if (!col.field && col.headerName !== '') {
        const MockParamsDecimalVal = {value: 99.9901};
        const MockParamsWholeVal = {value: 100};
        const MockParamsNoVal = {};
        const decRes = col.valueFormatter(MockParamsDecimalVal);
        const wholeRes = col.valueFormatter(MockParamsWholeVal);
        const noValRes = col.valueFormatter(MockParamsNoVal);
        expect(decRes.split('.')[1].length).toEqual(2);
        expect(wholeRes.split('.')[1].length).toEqual(2);
        expect(noValRes.indexOf('.')).toEqual(-1);
      }
    });
  });

  it('Bi-Weekly Company Cost should be 1/26th Annual Company Cost', () => {
    let biweeklyCompanyCost;
    let annualCompanyCost;
    const MockParams = {
      data: {
        annualSalary: 100000,
        annualEmployeeBenefitsCost: 2000,
        annualDependantBenefitsCost: 1000,
        percentEmployeeBenefitsPaidByEmployer: 27,
        percentDependantBenefitsPaidByEmployer: 13.5,
        numDependants: 3,
        name: 'Mr. Test'
      }
    };
    const cols = service.getColumnDefs();
    cols.forEach((col) => {
      if (col.headerName === 'Bi-Weekly Company Cost') {
        biweeklyCompanyCost = col.valueGetter(MockParams);
      }
      if (col.headerName === 'Annual Company Cost') {
        annualCompanyCost = col.valueGetter(MockParams);
      }
    });
    expect(biweeklyCompanyCost * 26).toEqual(annualCompanyCost);
  });

  it('Bi-Weekly Salary After Deductions should be 1/26th Annual Salary After Deductions', () => {
    let biweeklySalary;
    let annualSalary;
    const MockParams = {
      data: {
        annualSalary: 100000,
        annualEmployeeBenefitsCost: 2000,
        annualDependantBenefitsCost: 1000,
        percentEmployeeBenefitsPaidByEmployer: 27,
        percentDependantBenefitsPaidByEmployer: 13.5,
        numDependants: 3,
        name: 'Mr. Test'
      }
    };
    const cols = service.getColumnDefs();
    cols.forEach((col) => {
      if (col.headerName === 'Bi-Weekly Salary After Deductions') {
        biweeklySalary = col.valueGetter(MockParams);
      }
      if (col.headerName === 'Annual Salary After Deductions') {
        annualSalary = col.valueGetter(MockParams);
      }
    });
    expect(biweeklySalary * 26).toEqual(annualSalary);
  });
});
