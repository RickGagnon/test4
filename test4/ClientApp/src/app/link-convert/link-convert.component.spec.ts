import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkConvertComponent } from './link-convert.component';

describe('LinkConvertComponent', () => {
  let component: LinkConvertComponent;
  let fixture: ComponentFixture<LinkConvertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkConvertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkConvertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
