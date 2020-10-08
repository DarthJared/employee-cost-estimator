import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DataGridComponent } from './data-grid.component'
import { XlsxExcelService } from '../../services/xlsx-excel.service'
import { SimpleGridService } from '../../services/simple-grid.service'
import { DiscountANameCalculationService } from '../../services/discount-a-name-calculation.service'

describe('DataGridComponent', () => {
  let component: DataGridComponent
  let fixture: ComponentFixture<DataGridComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataGridComponent],
      providers: [
        { provide: 'ColumnDetailsService', useClass: SimpleGridService },
        { provide: 'DefaultDetailsService', useClass: SimpleGridService },
        {
          provide: 'CalculationService',
          useClass: DiscountANameCalculationService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DataGridComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
