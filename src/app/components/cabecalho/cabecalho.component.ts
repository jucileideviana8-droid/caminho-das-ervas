import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { SecaoSiteType } from '../../types/secao.type';
import { Router, RouterModule } from '@angular/router';
import { ProdutoService } from '../../services/produto.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-cabecalho',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.css',
})
export class CabecalhoComponent implements OnInit {
  @Input() usuarioLogado: string | null = null;
  isDropdownOpen = false;
  paginaAtual: SecaoSiteType = "paginaInicial";

  @Output() onChangePaginaAtual = new EventEmitter<SecaoSiteType>();
  @Output() abrirLoginEvent = new EventEmitter<void>();
  @Output() logoutEvent = new EventEmitter<void>();

  constructor(
    private router: Router, 
    private produtoService: ProdutoService, // Corrigido para minúsculo
    private loginService: LoginService
  ) {}
  
  ngOnInit(): void {
    this.loginService.usuarioLogado$.subscribe((email) => {
      this.usuarioLogado = email;
    });
  }

  // --- NOVA FUNÇÃO DE BUSCA ---
  onBusca(event: any) {
    const termo = event.target.value.toLowerCase();
    
    // Envia o que o usuário digitou para o serviço de filtro
    this.produtoService.setFiltro(termo || 'todos');

    // Se o usuário estiver na Home, redireciona automaticamente para a tela de produtos para ver o resultado
    if (this.router.url !== '/produtos') {
      this.router.navigate(['/produtos']);
    }
  }

  logout() {
    this.loginService.logout();    
    this.logoutEvent.emit();
  }

  abrirLogin(event: Event) {
    event.preventDefault(); 
    this.abrirLoginEvent.emit();
  }

  setPaginaAtual(event: Event, secao: SecaoSiteType) {
    event.preventDefault(); 
    
    this.paginaAtual = secao;
    this.onChangePaginaAtual.emit(this.paginaAtual);

    if (secao == "paginaInicial") {
      this.router.navigate(["/"]); 
    } else {
      // Avisa o serviço qual categoria foi clicada
      this.produtoService.setFiltro(secao);
      this.router.navigate(["/produtos"]); 
    }
  }
}
