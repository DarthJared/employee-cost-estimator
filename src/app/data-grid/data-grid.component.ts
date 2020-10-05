import { Component } from '@angular/core';
import {
  getAnnualAmountPaidByCompany,
  getAnnualEmployeeSalaryAfterDeductions
} from '../utils/paycheck.utils';
import {RemoveCellComponent} from '../remove-cell/remove-cell.component';
import {defaultDetails, dollarAmountDisplay, namePlaceholderRenderer} from '../utils/grid.utils';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent {
  domLayout = 'autoHeight';
  annualCostToCompany: number;

  columnDefs = [
    {
      headerName: '',
      cellRenderer: 'removeCellComponent',
      width: 60
    },
    {
      field: 'name',
      editable: true,
      // valueFormatter: namePlaceholderRenderer
    },
    {
      headerName: 'Number of Dependants',
      field: 'numDependants',
      editable: true,
      width: 200
    },
    {
      field: 'annualSalary',
      editable: true,
      width: 130
    },
    {
      field: 'yearlyEmployeeBenefitsCost',
      editable: true,
      width: 250
    },
    {
      field: 'yearlyDependantBenefitsCost',
      editable: true,
      width: 250
    },
    {
      headerName: '% Employee Benefits Paid By Employer',
      field: 'percentEmployeeBenefitsPaidByEmployer',
      editable: true,
      width: 310
    },
    {
      headerName: '% Dependant Benefits Paid By Employer',
      field: 'percentDependantBenefitsPaidByEmployer',
      editable: true,
      width: 320
    },
    {
      headerName: 'Bi-Weekly Amount Paid by Company',
      valueGetter: (params) =>
      {
        return getAnnualAmountPaidByCompany(
          params.data.annualSalary,
          params.data.yearlyEmployeeBenefitsCost,
          params.data.yearlyDependantBenefitsCost,
          params.data.percentEmployeeBenefitsPaidByEmployer,
          params.data.percentDependantBenefitsPaidByEmployer,
          params.data.numDependants
        ) / 26;
      },
      valueFormatter: dollarAmountDisplay,
      width: 290
    },
    {
      headerName: 'Yearly Amount Paid by Company',
      valueGetter: (params) =>
      {
        return getAnnualAmountPaidByCompany(
          params.data.annualSalary,
          params.data.yearlyEmployeeBenefitsCost,
          params.data.yearlyDependantBenefitsCost,
          params.data.percentEmployeeBenefitsPaidByEmployer,
          params.data.percentDependantBenefitsPaidByEmployer,
          params.data.numDependants
        );
      },
      valueFormatter: dollarAmountDisplay,
      width: 270
    },
    {
      headerName: 'Bi-Weekly Employee Salary After Deductions',
      valueGetter: (params) =>
      {
        return getAnnualEmployeeSalaryAfterDeductions(
          params.data.annualSalary,
          params.data.yearlyEmployeeBenefitsCost,
          params.data.yearlyDependantBenefitsCost,
          params.data.percentEmployeeBenefitsPaidByEmployer,
          params.data.percentDependantBenefitsPaidByEmployer,
          params.data.numDependants
        ) / 26;
      },
      valueFormatter: dollarAmountDisplay,
      width: 350
    },
    {
      headerName: 'Yearly Employee Salary After Deductions',
      valueGetter: (params) =>
      {
        return getAnnualEmployeeSalaryAfterDeductions(
          params.data.annualSalary,
          params.data.yearlyEmployeeBenefitsCost,
          params.data.yearlyDependantBenefitsCost,
          params.data.percentEmployeeBenefitsPaidByEmployer,
          params.data.percentDependantBenefitsPaidByEmployer,
          params.data.numDependants
        );
      },
      valueFormatter: dollarAmountDisplay,
      width: 330
    }
  ];

  frameworkComponents = {
    removeCellComponent: RemoveCellComponent
  };

  rowData = [defaultDetails];

  addEmployee(): void {
    const newRowData = this.rowData.concat(defaultDetails);
    this.rowData = newRowData;
    this.annualCostToCompany = null;
  }

  onCellValueChanged(params): void {
    if (this.rowData.length > 150) {
      this.domLayout = '';
    }
    this.annualCostToCompany = this.getAnualCompanyCost();
  }

  getAnualCompanyCost(): number {
    return this.rowData.reduce((acc, row) => {
      return acc + getAnnualAmountPaidByCompany(
        row.annualSalary,
        row.yearlyEmployeeBenefitsCost,
        row.yearlyDependantBenefitsCost,
        row.percentEmployeeBenefitsPaidByEmployer,
        row.percentDependantBenefitsPaidByEmployer,
        row.numDependants
      );
    }, 0);
  }
}
