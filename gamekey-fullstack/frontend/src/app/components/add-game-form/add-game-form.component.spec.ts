import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddGameFormComponent } from './add-game-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('AddGameFormComponent', () => {
  let component: AddGameFormComponent;
  let fixture: ComponentFixture<AddGameFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddGameFormComponent, ReactiveFormsModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddGameFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize form controls', () => {
    expect(component.gameForm).toBeDefined();
    expect(component.title?.value).toBe('');
    expect(component.price?.value).toBe(0);
  });

  it('should show form invalid status on empty fields', () => {
    expect(component.gameForm.valid).toBeFalse();
  });

  it('should validate title custom uppercase rule', () => {
    const titleControl = component.title;

    titleControl?.setValue('portal 3');
    expect(titleControl?.valid).toBeFalse();
    expect(titleControl?.errors?.['titleLowercase']).toBeTrue();

    titleControl?.setValue('Portal 3');
    expect(titleControl?.valid).toBeTrue();
  });
});
