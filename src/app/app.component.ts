import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {dollarAmountDisplay, getAnnualAmountPaidByCompany, getAnnualEmployeeSalaryAfterDeductions} from './utils/paycheck.utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  constructor(private ref: ChangeDetectorRef)
  {}

  domLayout = 'autoHeight';
  annualCostToCompany: number;

  columnDefs = [
    {
      field: 'name',
      editable: true
    },
    {
      field: 'numDependants',
      editable: true
    },
    {
      field: 'annualSalary',
      editable: true
    },
    {
      field: 'yearlyEmployeeBenefitsCost',
      editable: true
    },
    {
      field: 'yearlyDependantBenefitsCost',
      editable: true
    },
    {
      field: 'percentEmployeeBenefitsPaidByEmployer',
      editable: true
    },
    {
      field: 'percentDependantBenefitsPaidByEmployer',
      editable: true
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
      valueFormatter: dollarAmountDisplay
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
      valueFormatter: dollarAmountDisplay
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
      valueFormatter: dollarAmountDisplay
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
      valueFormatter: dollarAmountDisplay
    }
  ];

  rowData = [
    {
      name: 'Jared Beagley',
      numDependants: 3,
      annualSalary: 52000,
      yearlyEmployeeBenefitsCost: 1000,
      yearlyDependantBenefitsCost: 500,
      percentEmployeeBenefitsPaidByEmployer: 100,
      percentDependantBenefitsPaidByEmployer: 50
    }
  ];

  addEmployee(): void {
    const newRowData = this.rowData.concat({
      name: '',
      numDependants: null,
      annualSalary: 52000,
      yearlyEmployeeBenefitsCost: 1000,
      yearlyDependantBenefitsCost: 500,
      percentEmployeeBenefitsPaidByEmployer: 100,
      percentDependantBenefitsPaidByEmployer: 50
    });
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
