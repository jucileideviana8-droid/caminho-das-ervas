import { Component, Output, EventEmitter } from '@angular/core'; // Adicionado aqui
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {

  @Output() voltarLogin = new EventEmitter<void>();
  @Output() cadastroSucesso = new EventEmitter<void>()

  constructor(private router: Router) {}


  registrarUsuario() {
    console.log('Iniciando processo de cadastro...');

    alert('Cadastro realizado com sucesso!');
    this.cadastroSucesso.emit();

    this.router.navigate(['/login']);
  }

  irParaLogin(event: Event) {
    event.preventDefault();
    this.voltarLogin.emit();
  }



}