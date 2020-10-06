import {Component, EventEmitter, Input, Output} from '@angular/core';
import * as XLSX from 'xlsx';
import {GridService} from '../services/grid.service';
import {ExcelService} from '../services/excel.service';

@Component({
  selector: 'app-grid-actions',
  templateUrl: './grid-actions.component.html',
  styleUrls: ['./grid-actions.component.scss']
})
export class GridActionsComponent {
  @Output() employeeAdded = new EventEmitter();
  @Output() importSelected = new EventEmitter();
  @Input() currentGridData;

  constructor(private gridService: GridService, private excelService: ExcelService) { }

  addEmployee(): void {
    this.employeeAdded.emit();
  }

  onFileChange(evt: any): void {
    this.excelService.readExcelData(evt, (importedData) => {
      this.importSelected.emit(importedData);
    });
  }

  downloadData(template: boolean): void {
    this.excelService.downloadData(template, this.currentGridData);
  }
}
