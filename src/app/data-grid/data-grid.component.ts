import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {GridService} from '../services/grid.service';
import {CalculationService} from '../services/calculation.service';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridComponent {
  domLayout = 'autoHeight';
  annualCostToCompany: number;
  gridApi;
  gridColumnApi;
  frameworkComponents;
  columnDefs;
  rowData = [this.gridService.getDefaultDetails()];

  constructor(private cd: ChangeDetectorRef, private gridService: GridService, private calcService: CalculationService) {
    this.columnDefs = gridService.getColumnDefs();
    this.columnDefs[0].cellRendererParams = {
      clicked: () => {
        this.onCellValueChanged();
      }
    };
    this.frameworkComponents = this.gridService.getFrameworkComponents();
  }

  onGridReady(params): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  getCurrentRowData(): any {
    const currentRowData = [];
    if (!this.gridApi) {
      return currentRowData;
    }
    this.gridApi.forEachNode((rowNode, index) => {
      currentRowData.push(rowNode.data);
    });
    return currentRowData;
  }

  onCellValueChanged(): void {
    const currentRows = this.getCurrentRowData();
    if (currentRows.length > 150) {
      this.domLayout = '';
    }
    this.annualCostToCompany = this.calcService.getAnnualCompanyCost(currentRows);
    this.cd.markForCheck();
  }

  addEmployee(): void {
    const updatedRowData = this.getCurrentRowData();
    updatedRowData.push(this.gridService.getDefaultDetails());
    this.rowData = updatedRowData;
    this.annualCostToCompany = null;
  }

  importData(importedData: any): void {
    this.rowData = importedData;
    this.gridApi.setRowData(this.rowData);
    this.onCellValueChanged();
  }
}
