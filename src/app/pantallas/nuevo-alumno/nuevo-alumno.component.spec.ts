import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoAlumnoComponent } from './nuevo-alumno.component';

describe('NuevoAlumnoComponent', () => {
  let component: NuevoAlumnoComponent;
  let fixture: ComponentFixture<NuevoAlumnoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevoAlumnoComponent]
    });
    fixture = TestBed.createComponent(NuevoAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
