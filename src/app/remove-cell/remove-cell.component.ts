import {Component, OnDestroy} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';

@Component({
  selector: 'app-remove-cell',
  templateUrl: './remove-cell.component.html',
  styleUrls: ['./remove-cell.component.scss']
})
export class RemoveCellComponent implements ICellRendererAngularComp, OnDestroy {
  private params: any;

  agInit(params: any): void {
    this.params = params;
  }

  constructor() { }

  ngOnDestroy(): void { }

  refresh(params: any): boolean {
    return false;
  }

  removeRow(event): void {
    this.params.node.gridApi.updateRowData({ remove: [this.params.node.data] });
    this.params.clicked();
  }
}
