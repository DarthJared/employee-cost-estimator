import { Inject, Injectable } from '@angular/core'
import { RemoveCellComponent } from '../components/remove-cell/remove-cell.component'
import { ColDef } from 'ag-grid-community'
import { FinancialRowData } from '../data-typing/financial-row-data'
import {
  ColumnPropToColumnInfoMap,
  ColumnTitleToColumnPropMap,
} from '../data-typing/table-value-conversion'
import { GridService } from './grid.service'
import { CalculationService } from './calculation.service'

@Injectable({
  providedIn: 'root',
})
export class SimpleGridService implements GridService {
  private dollarAmountDisplay = (params): string => {
    if (!params.value) {
      return '--'
    }
    return params.value.toFixed(2)
  }

  private columnDefs: ColDef[] = [
    {
      headerName: '',
      pinned: 'left',
      width: 60,
      cellRenderer: 'removeCellComponent',
    },
    {
      field: 'name',
      editable: true,
      pinned: 'left',
      valueFormatter: this.getPlaceholderRenderer('name'),
    },
    {
      headerName: 'Number of Dependants',
      field: 'numDependants',
      editable: true,
      width: 250,
      valueFormatter: this.getPlaceholderRenderer('number of dependants'),
      valueParser: this.numberValueParser,
    },
    {
      field: 'annualSalary',
      editable: true,
      width: 130,
      valueParser: this.numberValueParser,
    },
    {
      field: 'annualEmployeeBenefitsCost',
      editable: true,
      width: 250,
      valueParser: this.numberValueParser,
    },
    {
      field: 'annualDependantBenefitsCost',
      editable: true,
      width: 250,
      valueParser: this.numberValueParser,
    },
    {
      headerName: '% Employee Benefits Paid By Employer',
      field: 'percentEmployeeBenefitsPaidByEmployer',
      editable: true,
      width: 290,
      valueParser: this.numberValueParser,
    },
    {
      headerName: '% Dependant Benefits Paid By Employer',
      field: 'percentDependantBenefitsPaidByEmployer',
      editable: true,
      width: 300,
      valueParser: this.numberValueParser,
    },
    {
      headerName: 'Bi-Weekly Company Cost',
      width: 200,
      valueGetter: params => {
        return (
          this.calcService.getAnnualAmountPaidByCompany(
            params.data.annualSalary,
            params.data.annualEmployeeBenefitsCost,
            params.data.annualDependantBenefitsCost,
            params.data.percentEmployeeBenefitsPaidByEmployer,
            params.data.percentDependantBenefitsPaidByEmployer,
            params.data.numDependants,
            params.data.name,
          ) / 26
        )
      },
      valueFormatter: this.dollarAmountDisplay,
    },
    {
      headerName: 'Bi-Weekly Salary After Deductions',
      width: 270,
      valueGetter: params => {
        return (
          this.calcService.getAnnualEmployeeSalaryAfterDeductions(
            params.data.annualSalary,
            params.data.annualEmployeeBenefitsCost,
            params.data.annualDependantBenefitsCost,
            params.data.percentEmployeeBenefitsPaidByEmployer,
            params.data.percentDependantBenefitsPaidByEmployer,
            params.data.numDependants,
            params.data.name,
          ) / 26
        )
      },
      valueFormatter: this.dollarAmountDisplay,
    },
    {
      headerName: 'Annual Company Cost',
      pinned: 'right',
      width: 180,
      valueGetter: params => {
        return this.calcService.getAnnualAmountPaidByCompany(
          params.data.annualSalary,
          params.data.annualEmployeeBenefitsCost,
          params.data.annualDependantBenefitsCost,
          params.data.percentEmployeeBenefitsPaidByEmployer,
          params.data.percentDependantBenefitsPaidByEmployer,
          params.data.numDependants,
          params.data.name,
        )
      },
      valueFormatter: this.dollarAmountDisplay,
    },
    {
      headerName: 'Annual Salary After Deductions',
      pinned: 'right',
      width: 250,
      valueGetter: params => {
        return this.calcService.getAnnualEmployeeSalaryAfterDeductions(
          params.data.annualSalary,
          params.data.annualEmployeeBenefitsCost,
          params.data.annualDependantBenefitsCost,
          params.data.percentEmployeeBenefitsPaidByEmployer,
          params.data.percentDependantBenefitsPaidByEmployer,
          params.data.numDependants,
          params.data.name,
        )
      },
      valueFormatter: this.dollarAmountDisplay,
    },
  ]

  private frameworkComponents = {
    removeCellComponent: RemoveCellComponent,
  }

  /* A map of the column titles to the field names */
  private columnTitlesToProps: ColumnTitleToColumnPropMap = {
    Name: 'name',
    'Number of Dependants': 'numDependants',
    'Annual Salary': 'annualSalary',
    'Annual Employee Benefits Cost': 'annualEmployeeBenefitsCost',
    'Annual Dependants Benefits Cost': 'annualDependantBenefitsCost',
    '% Employee Benefits Paid By Employer':
      'percentEmployeeBenefitsPaidByEmployer',
    '% Dependant Benefits Paid By Employer':
      'percentDependantBenefitsPaidByEmployer',
  }

  /* A map of the field names to the column titles and the width of each column in excel */
  private columnPropToColumnInfo: ColumnPropToColumnInfoMap = {
    name: {
      title: 'Name',
      width: 40,
    },
    numDependants: {
      title: 'Number of Dependants',
      width: 25,
    },
    annualSalary: {
      title: 'Annual Salary',
      width: 25,
    },
    annualEmployeeBenefitsCost: {
      title: 'Annual Employee Benefits Cost',
      width: 40,
    },
    annualDependantBenefitsCost: {
      title: 'Annual Dependants Benefits Cost',
      width: 40,
    },
    percentEmployeeBenefitsPaidByEmployer: {
      title: '% Employee Benefits Paid By Employer',
      width: 40,
    },
    percentDependantBenefitsPaidByEmployer: {
      title: '% Dependant Benefits Paid By Employer',
      width: 40,
    },
  }

  constructor(
    @Inject('CalculationService') private calcService: CalculationService,
  ) {}

  getColumnDefs(): ColDef[] {
    return this.columnDefs
  }

  getFrameworkComponents(): any {
    return this.frameworkComponents
  }

  getColumnTitlesToProps(): ColumnTitleToColumnPropMap {
    return this.columnTitlesToProps
  }

  getColumnPropToColumnInfo(): ColumnPropToColumnInfoMap {
    return this.columnPropToColumnInfo
  }

  getDefaultDetails(): FinancialRowData {
    return {
      name: '',
      numDependants: null,
      annualSalary: 52000,
      annualEmployeeBenefitsCost: 1000,
      annualDependantBenefitsCost: 500,
      percentEmployeeBenefitsPaidByEmployer: 100,
      percentDependantBenefitsPaidByEmployer: 50,
    }
  }

  private numberValueParser(params): number {
    /* Ensures that inputs to the table always return as numbers */
    return Number(params.newValue)
  }

  private getPlaceholderRenderer(field: string): any {
    return (params): string | number => {
      if (params.value) {
        return params.value
      }
      return `Enter ${field}...`
    }
  }
}
