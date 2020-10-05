import { Component } from '@angular/core';
import {
  getAnnualAmountPaidByCompany,
  getAnnualEmployeeSalaryAfterDeductions
} from '../utils/paycheck.utils';
import {RemoveCellComponent} from '../remove-cell/remove-cell.component';
import {getDefaultDetails, dollarAmountDisplay, getPlaceholderRenderer} from '../utils/grid.utils';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent {
  domLayout = 'autoHeight';
  annualCostToCompany: number;
  gridApi;
  gridColumnApi;

  columnDefs = [
    {
      headerName: '',
      cellRenderer: 'removeCellComponent',
      width: 60,
      cellRendererParams: {
        clicked: () => {
          this.onCellValueChanged(null);
        }
      },
    },
    {
      field: 'name',
      editable: true,
      valueFormatter: getPlaceholderRenderer('name')
    },
    {
      headerName: 'Number of Dependants',
      field: 'numDependants',
      editable: true,
      width: 250,
      valueFormatter: getPlaceholderRenderer('number of dependants')
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

  rowData = [getDefaultDetails()];

  getCurrentRowData(): any {
    const currentRowData = [];
    this.gridApi.forEachNode((rowNode, index) => {
      currentRowData.push(rowNode.data);
    });
    return currentRowData;
  }

  addEmployee(): void {
    const updatedRowData = this.getCurrentRowData();
    updatedRowData.push(getDefaultDetails());
    this.rowData = updatedRowData;
    this.annualCostToCompany = null;
  }

  onCellValueChanged(params): void {
    const currentRows = this.getCurrentRowData();
    if (currentRows.length > 150) {
      this.domLayout = '';
    }
    this.annualCostToCompany = this.getAnualCompanyCost();
  }

  onGridReady(params): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  getAnualCompanyCost(): number {
    let missingData = false;
    const currentRowData = this.getCurrentRowData();
    const finalCost = currentRowData.reduce((acc, row) => {
      const companyCost = getAnnualAmountPaidByCompany(
        row.annualSalary,
        row.yearlyEmployeeBenefitsCost,
        row.yearlyDependantBenefitsCost,
        row.percentEmployeeBenefitsPaidByEmployer,
        row.percentDependantBenefitsPaidByEmployer,
        row.numDependants
      );
      if (!companyCost) {
        missingData = true;
      }
      return acc + companyCost;
    }, 0);
    if (missingData) {
      return null;
    }
    return finalCost;
  }
}
