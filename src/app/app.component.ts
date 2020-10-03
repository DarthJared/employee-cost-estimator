import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

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
      headerName: 'Monthly Amount Paid by Company',
      valueGetter: (params) =>
      {
        if (!params.data.annualSalary
          || !params.data.yearlyEmployeeBenefitsCost
          || !params.data.yearlyDependantBenefitsCost
          || !params.data.percentEmployeeBenefitsPaidByEmployer
          || !params.data.percentDependantBenefitsPaidByEmployer
          || !params.data.numDependants) {
          return '';
        }
        return (params.data.annualSalary
          + (params.data.yearlyEmployeeBenefitsCost
            * params.data.percentEmployeeBenefitsPaidByEmployer / 100)
          + ((params.data.yearlyDependantBenefitsCost
            * params.data.percentDependantBenefitsPaidByEmployer / 100)
            * params.data.numDependants)) / 12;
      },
      valueFormatter: (params) => {
        if (params.value === '') {
          return '--';
        }
        return params.value.toFixed(2);
      }
    },
    {
      headerName: 'Yearly Amount Paid by Company',
      valueGetter: (params) =>
      {
        if (!params.data.annualSalary
          || !params.data.yearlyEmployeeBenefitsCost
          || !params.data.yearlyDependantBenefitsCost
          || !params.data.percentEmployeeBenefitsPaidByEmployer
          || !params.data.percentDependantBenefitsPaidByEmployer
          || !params.data.numDependants) {
          return '';
        }
        return (params.data.annualSalary
          + (params.data.yearlyEmployeeBenefitsCost
            * params.data.percentEmployeeBenefitsPaidByEmployer / 100)
          + ((params.data.yearlyDependantBenefitsCost
            * params.data.percentDependantBenefitsPaidByEmployer / 100)
            * params.data.numDependants));
      },
      valueFormatter: (params) => {
        if (params.value === '') {
          return '--';
        }
        return params.value.toFixed(2);
      }
    },
    {
      headerName: 'Monthly Amount in Employee Paycheck',
      valueGetter: (params) =>
      {
        if (!params.data.annualSalary
          || !params.data.yearlyEmployeeBenefitsCost
          || !params.data.yearlyDependantBenefitsCost
          || !params.data.percentEmployeeBenefitsPaidByEmployer
          || !params.data.percentDependantBenefitsPaidByEmployer
          || !params.data.numDependants) {
          return '';
        }
        return (params.data.annualSalary
          - (params.data.yearlyEmployeeBenefitsCost
            * (100 - params.data.percentEmployeeBenefitsPaidByEmployer) / 100)
          - ((params.data.yearlyDependantBenefitsCost
            * (100 - params.data.percentDependantBenefitsPaidByEmployer) / 100)
            * params.data.numDependants)) / 12;
      },
      valueFormatter: (params) => {
        if (params.value === '') {
          return '--';
        }
        return params.value.toFixed(2);
      }
    },
    {
      headerName: 'Yearly Amount in Employee Paycheck',
      valueGetter: (params) =>
      {
        if (!params.data.annualSalary
          || !params.data.yearlyEmployeeBenefitsCost
          || !params.data.yearlyDependantBenefitsCost
          || !params.data.percentEmployeeBenefitsPaidByEmployer
          || !params.data.percentDependantBenefitsPaidByEmployer
          || !params.data.numDependants) {
          return '';
        }
        return (params.data.annualSalary
          - (params.data.yearlyEmployeeBenefitsCost
            * (100 - params.data.percentEmployeeBenefitsPaidByEmployer) / 100)
          - ((params.data.yearlyDependantBenefitsCost
            * (100 - params.data.percentDependantBenefitsPaidByEmployer) / 100)
            * params.data.numDependants));
      },
      valueFormatter: (params) => {
        if (params.value === '') {
          return '--';
        }
        return params.value.toFixed(2);
      }
    }
  ];

  rowData = [
    {
      name: 'Jared Beagley',
      numDependants: 3,
      annualSalary: 24000,
      yearlyEmployeeBenefitsCost: 1000,
      yearlyDependantBenefitsCost: 500,
      percentEmployeeBenefitsPaidByEmployer: 100,
      percentDependantBenefitsPaidByEmployer: 50
    }
  ];

  constructor(private ref: ChangeDetectorRef)
  {}

  addEmployee(): void {
    const newRowData = this.rowData.concat({
      name: '',
      numDependants: null,
      annualSalary: 24000,
      yearlyEmployeeBenefitsCost: 1000,
      yearlyDependantBenefitsCost: 500,
      percentEmployeeBenefitsPaidByEmployer: 100,
      percentDependantBenefitsPaidByEmployer: 50
    });
    this.rowData = newRowData;
  }
}
