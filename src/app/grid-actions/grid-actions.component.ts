import {Component, EventEmitter, Input, Output} from '@angular/core';
import * as XLSX from 'xlsx';
import {GridService} from '../services/grid.service';

@Component({
  selector: 'app-grid-actions',
  templateUrl: './grid-actions.component.html',
  styleUrls: ['./grid-actions.component.scss']
})
export class GridActionsComponent {
  @Output() employeeAdded = new EventEmitter();
  @Output() importSelected = new EventEmitter();
  @Input() currentGridData;

  columnTitlesToProps = {
    Name: 'name',
    'Number of Dependants': 'numDependants',
    'Annual Salary': 'annualSalary',
    'Annual Employee Benefits Cost': 'annualEmployeeBenefitsCost',
    'Annual Dependants Benefits Cost': 'annualDependantBenefitsCost',
    '% Employee Benefits Paid By Employer': 'percentEmployeeBenefitsPaidByEmployer',
    '% Dependant Benefits Paid By Employer': 'percentDependantBenefitsPaidByEmployer'
  };

  columnPropToColumnInfo = {
    name: {
      title: 'Name',
      width: 40
    },
    numDependants: {
      title: 'Number of Dependants',
      width: 25
    },
    annualSalary: {
      title: 'Annual Salary',
      width: 25
    },
    annualEmployeeBenefitsCost: {
      title: 'Annual Employee Benefits Cost',
      width: 40
    },
    annualDependantBenefitsCost: {
      title: 'Annual Dependants Benefits Cost',
      width: 40
    },
    percentEmployeeBenefitsPaidByEmployer: {
      title: '% Employee Benefits Paid By Employer',
      width: 40
    },
    percentDependantBenefitsPaidByEmployer: {
      title: '% Dependant Benefits Paid By Employer',
      width: 40
    }
  };

  constructor(private gridService: GridService) { }

  addEmployee(): void {
    this.employeeAdded.emit();
  }

  private applyImportedData(data: any): any {
    const importedData = [];
    for (let i = 0; i < data[0].length; i++) {
      for (let j = 1; j < data.length; j++) {
        if (i === 0) {
          importedData.push(this.gridService.getDefaultDetails());
        }
        importedData[j - 1][this.columnTitlesToProps[data[0][i]]] = data[j][i];
      }
    }
    return importedData;
  }

  onFileChange(evt: any): void {
    /* wire up file reader */
    const target: DataTransfer = evt.target as DataTransfer;
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      const data = (XLSX.utils.sheet_to_json(ws, {header: 1}));
      const importedData = this.applyImportedData(data);
      this.importSelected.emit(importedData);
    };
    reader.readAsBinaryString(target.files[0]);
  }

  private getExcelFormatData(template: boolean): any {
    const props = [];
    const headerRow = [];
    if (template) {
      for (const columnName of Object.keys(this.columnTitlesToProps)) {
        headerRow.push(columnName);
      }
      return [headerRow];
    }
    for (const columnName of Object.keys(this.currentGridData[0])) {
      props.push(columnName);
      headerRow.push(this.columnPropToColumnInfo[columnName].title);
    }
    const dataRows = [headerRow];
    for (const row of this.currentGridData) {
      const rowData = [];
      for (const columnName of props) {
        rowData.push(row[columnName]);
      }
      dataRows.push(rowData);
    }
    return dataRows;
  }

  downloadData(template: boolean): void {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.getExcelFormatData(template));
    const wscols = [];
    for (const columnKey of Object.keys(this.columnPropToColumnInfo)){
      wscols.push({
        wch: this.columnPropToColumnInfo[columnKey].width
      });
    }

    ws['!cols'] = wscols;
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, `Cost Estimation${template ? ' Template' : ''}.xlsx`);
  }
}
