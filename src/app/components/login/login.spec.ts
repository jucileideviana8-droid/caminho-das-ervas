import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component'; // Nome do arquivo e classe corrigidos
import { FormsModule } from '@angular/forms'; // Necessário pois seu login usa forms

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Importamos o componente e o FormsModule para suportar o ngModel
      imports: [LoginComponent, FormsModule], 
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Substitui o whenStable para disparar o ciclo de vida inicial
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
