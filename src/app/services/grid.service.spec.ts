import { TestBed } from '@angular/core/testing';

import { GridService } from './grid.service';

describe('GridService', () => {
  let service: GridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('number columns should always be a number', () => {
    const cols = service.getColumnDefs();
    cols.forEach((col) => {
      if (col.field && col.field !== 'name') {
        const numRes = col.valueParser({newValue: 1});
        const strRes = col.valueParser({newValue: '1'});
        const nanRes = col.valueParser({newValue: 'abc'});

        expect(typeof numRes).toEqual('number');
        expect(typeof strRes).toEqual('number');
        expect(numRes).toEqual(strRes);
        expect(nanRes).toBeNaN();
      }
    });
  });

  it('placeholder should only return when no value is present', () => {
    const nameCol = service.getColumnDefs()[1];
    const valExists = nameCol.valueFormatter({value: 1});
    const noVal = nameCol.valueFormatter({});
    expect(typeof valExists).toEqual('number');
    expect(typeof noVal).toEqual('string');
    expect(valExists).toEqual(1);
  });
});
