import { TestBed } from '@angular/core/testing';
import { ExcelService } from './excel.service';
import {FinancialRowData} from './financial-row-data';
import {ExcelGridData} from './excel-data';

describe('ExcelService', () => {
  let service: ExcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should transform imported data from array of arrays to array of objects', () => {
    const MockExcelData: ExcelGridData = [
      [
        'name',
        'numDependants',
        'annualSalary',
        'annualEmployeeBenefitsCost',
        'annualDependantBenefitsCost',
        'percentEmployeeBenefitsPaidByEmployer',
        'percentDependantBenefitsPaidByEmployer'
      ],
      [
        'Mr. Tester',
        1,
        100000,
        2000,
        1000,
        1,
        0
      ],
      [
        'Ms. Testing',
        2,
        150000,
        2000,
        1000,
        1,
        0
      ]
    ];
    const tableFormattedData: FinancialRowData[] = service.applyImportedData(MockExcelData);
    tableFormattedData.forEach((tableRow) => {
      expect(typeof tableRow).toEqual('object');
    });
    expect(tableFormattedData.length).toEqual(2);
  });

  it('should transform imported data from array of arrays to array of objects', () => {
    const MockGridData: FinancialRowData[] = [
      {
        name: 'Mr. Tester',
        numDependants: 1,
        annualSalary: 100000,
        annualEmployeeBenefitsCost: 2000,
        annualDependantBenefitsCost: 1000,
        percentEmployeeBenefitsPaidByEmployer: 1,
        percentDependantBenefitsPaidByEmployer: 0
      },
      {
        name: 'Ms. Testing',
        numDependants: 2,
        annualSalary: 150000,
        annualEmployeeBenefitsCost: 2000,
        annualDependantBenefitsCost: 1000,
        percentEmployeeBenefitsPaidByEmployer: 1,
        percentDependantBenefitsPaidByEmployer: 0
      }
    ];
    const excelFormattedData: ExcelGridData = service.getExcelFormatData(false, MockGridData);
    excelFormattedData.forEach((rowData) => {
      expect(typeof rowData).toEqual('object');
    });
    expect(excelFormattedData.length).toEqual(3);
  });

  it('should return 1 row for defaulted download', () => {
    const MockGridData: FinancialRowData[] = [
      {
        name: 'Mr. Tester',
        numDependants: 1,
        annualSalary: 100000,
        annualEmployeeBenefitsCost: 2000,
        annualDependantBenefitsCost: 1000,
        percentEmployeeBenefitsPaidByEmployer: 1,
        percentDependantBenefitsPaidByEmployer: 0
      },
      {
        name: 'Ms. Testing',
        numDependants: 2,
        annualSalary: 150000,
        annualEmployeeBenefitsCost: 2000,
        annualDependantBenefitsCost: 1000,
        percentEmployeeBenefitsPaidByEmployer: 1,
        percentDependantBenefitsPaidByEmployer: 0
      }
    ];
    const excelFormattedData: ExcelGridData = service.getExcelFormatData(true, MockGridData);
    expect(excelFormattedData.length).toEqual(1);
  });
});
