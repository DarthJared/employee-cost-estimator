import { ComponentFixture, TestBed } from '@angular/core/testing'
import { GridActionsComponent } from './grid-actions.component'
import { XlsxExcelService } from '../../services/xlsx-excel.service'
import { SimpleGridService } from '../../services/simple-grid.service'

describe('GridActionsComponent', () => {
  let component: GridActionsComponent
  let fixture: ComponentFixture<GridActionsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GridActionsComponent],
      providers: [
        { provide: 'GridService', useClass: SimpleGridService },
        { provide: 'ExcelService', useClass: XlsxExcelService },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(GridActionsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
