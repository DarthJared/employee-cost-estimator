import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule } from '@angular/forms'
import { AgGridModule } from 'ag-grid-angular'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { DataGridComponent } from './components/data-grid/data-grid.component'
import { RemoveCellComponent } from './components/remove-cell/remove-cell.component'
import { GridActionsComponent } from './components/grid-actions/grid-actions.component'

@NgModule({
  declarations: [
    AppComponent,
    DataGridComponent,
    RemoveCellComponent,
    GridActionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    AgGridModule.withComponents([RemoveCellComponent]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
