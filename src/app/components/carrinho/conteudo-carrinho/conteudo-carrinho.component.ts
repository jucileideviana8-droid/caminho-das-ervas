import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { CarrinhoService } from '../../../services/carrinho.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-conteudo-carrinho',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './conteudo-carrinho.component.html',
  styleUrl: './conteudo-carrinho.component.css',
})
export class ConteudoCarrinhoComponent {
  
  @Output()
  onClose = new EventEmitter<void>();

  constructor(public carrinhoService: CarrinhoService, private router: Router) {}

  fecharCarrinho(){
    this.onClose.emit();
  }

  irParaPagamento() {
    this.fecharCarrinho();
    this.router.navigate(['/pagamento']); 
  }
}
