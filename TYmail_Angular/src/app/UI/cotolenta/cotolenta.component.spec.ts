import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotolentaComponent } from './cotolenta.component';

describe('CotolentaComponent', () => {
  let component: CotolentaComponent;
  let fixture: ComponentFixture<CotolentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CotolentaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CotolentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
