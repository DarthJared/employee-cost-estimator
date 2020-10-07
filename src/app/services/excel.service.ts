import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import {GridService} from './grid.service';
import {ColInfo} from 'xlsx';
import {FinancialRowData} from '../data-typing/financial-row-data';
import {ExcelGridData, ExcelRowData} from '../data-typing/excel-data';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor(private gridService: GridService) { }

  applyImportedData(data: ExcelGridData): FinancialRowData[] {
    const importedData: FinancialRowData[] = [];
    for (let i = 0; i < data[0].length; i++) {
      for (let j = 1; j < data.length; j++) {
        if (i === 0) {
          importedData.push(this.gridService.getDefaultDetails());
        }
        importedData[j - 1][this.gridService.getColumnTitlesToProps()[data[0][i]]] = data[j][i];
      }
    }
    return importedData;
  }

  readExcelData(evt, callback): void {
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
      const data: ExcelGridData = (XLSX.utils.sheet_to_json(ws, {header: 1}));
      const importedData: FinancialRowData[] = this.applyImportedData(data);
      callback(importedData);
    };
    reader.readAsBinaryString(target.files[0]);
  }

  getExcelFormatData(template: boolean, currentGridData: FinancialRowData[]): ExcelGridData {
    /* Tracks the field names for the columns and maintains order */
    const props: ExcelRowData = [];
    /* Tracks the display names for the columns and maintains order */
    const headerRow: ExcelRowData = [];
    if (template) {
      /* If they are downloading the Import Template, only give them the column headers */
      for (const columnName of Object.keys(this.gridService.getColumnTitlesToProps())) {
        headerRow.push(columnName);
      }
      return [headerRow];
    }
    for (const columnName of Object.keys(currentGridData[0])) {
      props.push(columnName);
      headerRow.push(this.gridService.getColumnPropToColumnInfo()[columnName].title);
    }
    const dataRows: ExcelGridData = [headerRow];
    for (const row of currentGridData) {
      const rowData: ExcelRowData = [];
      /* For each row, loop over the data and get the column data in the right order */
      for (const columnName of props) {
        rowData.push(row[columnName]);
      }
      dataRows.push(rowData);
    }
    return dataRows;
  }

  downloadData(template: boolean, currentGridData: FinancialRowData[]): void {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.getExcelFormatData(template, currentGridData));
    const wscols: ColInfo[] = [];
    for (const columnKey of Object.keys(this.gridService.getColumnPropToColumnInfo())){
      wscols.push({
        wch: this.gridService.getColumnPropToColumnInfo()[columnKey].width
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
