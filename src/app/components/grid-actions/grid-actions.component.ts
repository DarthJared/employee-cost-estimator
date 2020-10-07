import { Component, EventEmitter, Inject, Input, Output } from '@angular/core'
import { ExcelService } from '../../services/excel.service'
import { GridService } from '../../services/grid.service'

@Component({
  selector: 'app-grid-actions',
  templateUrl: './grid-actions.component.html',
  styleUrls: ['./grid-actions.component.scss'],
})
export class GridActionsComponent {
  @Output() employeeAdded = new EventEmitter()
  @Output() importSelected = new EventEmitter()
  @Input() currentGridData

  constructor(
    @Inject('GridService') private gridService: GridService,
    @Inject('ExcelService') private excelService: ExcelService,
  ) {}

  addEmployee(): void {
    this.employeeAdded.emit()
  }

  onFileChange(evt): void {
    this.excelService.readExcelData(evt, importedData => {
      this.importSelected.emit(importedData)
    })
  }

  downloadData(template: boolean): void {
    this.excelService.downloadData(template, this.currentGridData)
  }
}
