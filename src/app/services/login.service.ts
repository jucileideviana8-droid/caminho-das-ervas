import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  // O BehaviorSubject inicia verificando se já existe um usuário salvo no navegador (localStorage)
  // Isso evita que o usuário "deslogue" ao dar F5 na página.
  private usuarioLogadoSubject = new BehaviorSubject<string | null>(localStorage.getItem('usuarioLogado'));
  
  // Observable que o Cabeçalho e outros componentes ficam "ouvindo"
  usuarioLogado$ = this.usuarioLogadoSubject.asObservable();

  constructor() { }

  /**
   * Realiza o login, salva no armazenamento local e avisa todos os componentes
   * @param email E-mail do usuário que logou
   */
  login(email: string) {
    localStorage.setItem('usuarioLogado', email);
    this.usuarioLogadoSubject.next(email); // Dispara a atualização para quem estiver inscrito
  }

  /**
   * Remove os dados de login e limpa o estado global
   */
  logout() {
    localStorage.removeItem('usuarioLogado');
    this.usuarioLogadoSubject.next(null); // Avisa que não há mais ninguém logado
  }

  /**
   * Retorna o e-mail do usuário logado no momento (útil para verificações rápidas)
   */
  getUsuarioAtual(): string | null {
    return this.usuarioLogadoSubject.value;
  }

  /**
   * Verifica se existe um usuário autenticado
   */
  isAutenticado(): boolean {
    return this.usuarioLogadoSubject.value !== null;
  }
}
