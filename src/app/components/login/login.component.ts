import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service'; // Certifique-se que o caminho está correto

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @Output() loginSucesso = new EventEmitter<void>();

  email = '';
  password = '';
  nome = ''; 
  errorMessage = '';
  isLoginMode = true; 

  constructor(private loginService: LoginService) {}

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = '';
  }

  onSubmit() {
    if (this.isLoginMode) {
      // --- Lógica de LOGIN ---
      
      // 1. Buscamos a lista de usuários que foram cadastrados no sistema
      const usuariosSalvos = JSON.parse(localStorage.getItem('usuarios') || '[]');

      // 2. Verificamos se existe um usuário com o email e senha digitados
      const usuarioEncontrado = usuariosSalvos.find((u: any) => 
        u.email === this.email && u.password === this.password
      );

      // 3. Permitimos a entrada se for o Admin OU se o usuário for encontrado na lista
      if ((this.email === 'admin@email.com' && this.password === '123456') || usuarioEncontrado) {
        
        this.loginService.login(this.email); // Avisa o Service (e o cabeçalho) quem logou
        this.loginSucesso.emit();
        
      } else {
        this.errorMessage = 'E-mail ou senha incorretos';
      }

    } else {
      // --- Lógica de CADASTRO ---
      if (this.email && this.password && this.nome) {
        
        // Recuperamos a lista atual, adicionamos o novo e salvamos de volta
        const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
        
        // Verifica se o email já está cadastrado para evitar duplicados
        const emailExiste = usuarios.some((u: any) => u.email === this.email);
        
        if(emailExiste) {
          this.errorMessage = 'Este e-mail já está cadastrado';
          return;
        }

        usuarios.push({ 
          nome: this.nome, 
          email: this.email, 
          password: this.password 
        });

        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        
        alert('Cadastro realizado com sucesso! Agora faça o login.');
        this.isLoginMode = true; // Volta para tela de login
        this.errorMessage = '';

      } else {
        this.errorMessage = 'Preencha todos os campos para se cadastrar';
      }
    }
  }

  fechar(){
    this.loginSucesso.emit();
  }
}
