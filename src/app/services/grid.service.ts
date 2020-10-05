import { Injectable } from '@angular/core';
import {RemoveCellComponent} from '../remove-cell/remove-cell.component';
import {CalculationService} from './calculation.service';

@Injectable({
  providedIn: 'root'
})
export class GridService {
  dollarAmountDisplay = (params) => {
    if (!params.value) {
      return '--';
    }
    return params.value.toFixed(2);
  }

  private columnDefs = [
    {
      headerName: '',
      pinned: 'left',
      width: 60,
      cellRenderer: 'removeCellComponent'
    },
    {
      field: 'name',
      editable: true,
      pinned: 'left',
      valueFormatter: this.getPlaceholderRenderer('name')
    },
    {
      headerName: 'Number of Dependants',
      field: 'numDependants',
      editable: true,
      width: 250,
      valueFormatter: this.getPlaceholderRenderer('number of dependants'),
      valueParser: this.numberValueParser
    },
    {
      field: 'annualSalary',
      editable: true,
      width: 130,
      valueParser: this.numberValueParser
    },
    {
      field: 'annualEmployeeBenefitsCost',
      editable: true,
      width: 250,
      valueParser: this.numberValueParser
    },
    {
      field: 'annualDependantBenefitsCost',
      editable: true,
      width: 250,
      valueParser: this.numberValueParser
    },
    {
      headerName: '% Employee Benefits Paid By Employer',
      field: 'percentEmployeeBenefitsPaidByEmployer',
      editable: true,
      width: 290,
      valueParser: this.numberValueParser
    },
    {
      headerName: '% Dependant Benefits Paid By Employer',
      field: 'percentDependantBenefitsPaidByEmployer',
      editable: true,
      width: 300,
      valueParser: this.numberValueParser
    },
    {
      headerName: 'Bi-Weekly Company Cost',
      width: 200,
      valueGetter: (params) =>
      {
        return this.calcService.getAnnualAmountPaidByCompany(
          params.data.annualSalary,
          params.data.annualEmployeeBenefitsCost,
          params.data.annualDependantBenefitsCost,
          params.data.percentEmployeeBenefitsPaidByEmployer,
          params.data.percentDependantBenefitsPaidByEmployer,
          params.data.numDependants
        ) / 26;
      },
      valueFormatter: this.dollarAmountDisplay
    },
    {
      headerName: 'Bi-Weekly Salary After Deductions',
      width: 270,
      valueGetter: (params) =>
      {
        return this.calcService.getAnnualEmployeeSalaryAfterDeductions(
          params.data.annualSalary,
          params.data.annualEmployeeBenefitsCost,
          params.data.annualDependantBenefitsCost,
          params.data.percentEmployeeBenefitsPaidByEmployer,
          params.data.percentDependantBenefitsPaidByEmployer,
          params.data.numDependants
        ) / 26;
      },
      valueFormatter: this.dollarAmountDisplay
    },
    {
      headerName: 'Annual Company Cost',
      pinned: 'right',
      width: 180,
      valueGetter: (params) =>
      {
        return this.calcService.getAnnualAmountPaidByCompany(
          params.data.annualSalary,
          params.data.annualEmployeeBenefitsCost,
          params.data.annualDependantBenefitsCost,
          params.data.percentEmployeeBenefitsPaidByEmployer,
          params.data.percentDependantBenefitsPaidByEmployer,
          params.data.numDependants
        );
      },
      valueFormatter: this.dollarAmountDisplay
    },
    {
      headerName: 'Annual Salary After Deductions',
      pinned: 'right',
      width: 250,
      valueGetter: (params) =>
      {
        return this.calcService.getAnnualEmployeeSalaryAfterDeductions(
          params.data.annualSalary,
          params.data.annualEmployeeBenefitsCost,
          params.data.annualDependantBenefitsCost,
          params.data.percentEmployeeBenefitsPaidByEmployer,
          params.data.percentDependantBenefitsPaidByEmployer,
          params.data.numDependants
        );
      },
      valueFormatter: this.dollarAmountDisplay
    }
  ];

  frameworkComponents = {
    removeCellComponent: RemoveCellComponent
  };

  constructor(private calcService: CalculationService) { }

  getFrameworkComponents(): any {
    return this.frameworkComponents;
  }

  getDefaultDetails(): any {
    return {
      name: '',
      numDependants: null,
      annualSalary: 52000,
      annualEmployeeBenefitsCost: 1000,
      annualDependantBenefitsCost: 500,
      percentEmployeeBenefitsPaidByEmployer: 100,
      percentDependantBenefitsPaidByEmployer: 50
    };
  }

  numberValueParser(params): number {
    return Number(params.newValue);
  }

  getPlaceholderRenderer(field: string): any {
    return (params) => {
      if (params.value) {
        return params.value;
      }
      return `Enter ${field}...`;
    };
  }

  getColumnDefs(): any {
    return this.columnDefs;
  }
}
