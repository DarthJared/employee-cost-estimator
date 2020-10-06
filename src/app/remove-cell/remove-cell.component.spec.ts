import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RemoveCellComponent } from './remove-cell.component';

describe('RemoveCellComponent', () => {
  let component: RemoveCellComponent;
  let fixture: ComponentFixture<RemoveCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
