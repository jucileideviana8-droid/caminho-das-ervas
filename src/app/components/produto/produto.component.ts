import { Component, Input, OnInit } from '@angular/core';
import { produtoModel } from '../../models/produto.model';
import { CommonModule } from '@angular/common';
import { CarrinhoService } from '../../services/carrinho.service'; 
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-produto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './produto.component.html',
  styleUrl: './produto.component.css',
})
export class ProdutoComponent implements OnInit { // Removida a vírgula incorreta
  @Input() produto!: produtoModel;

  constructor(
    private service: ProdutoService, 
    private carrinhoService: CarrinhoService
  ) {}

  ngOnInit(): void {
    // Não precisa de subscribe aqui! 
    // O 'produto' já vem preenchido pelo componente pai.
    console.log('Produto recebido no card:', this.produto);
  }
  
  adicionarAoCarrinho() {
    this.carrinhoService.adicionarAoCarrinho(this.produto);
  }
}
