import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';

@Component({
  selector: 'app-remove-cell',
  templateUrl: './remove-cell.component.html',
  styleUrls: ['./remove-cell.component.scss']
})
export class RemoveCellComponent implements ICellRendererAngularComp {
  private params: any;

  constructor() { }

  agInit(params: any): void {
    this.params = params;
  }

  /* Method required by the ICellRendererAngularComp interface */
  refresh(params: any): boolean {
    return false;
  }

  removeRow(): void {
    this.params.node.gridApi.updateRowData({ remove: [this.params.node.data] });
    this.params.clicked();
  }
}
