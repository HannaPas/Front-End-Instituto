import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTemaComponent } from './editar-tema.component';

describe('EditarTemaComponent', () => {
  let component: EditarTemaComponent;
  let fixture: ComponentFixture<EditarTemaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarTemaComponent]
    });
    fixture = TestBed.createComponent(EditarTemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
