import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConteudoCarrinhoComponent } from './conteudo-carrinho/conteudo-carrinho.component';
import { CarrinhoService } from '../../services/carrinho.service';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule,ConteudoCarrinhoComponent],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css',
})
export class CarrinhoComponent {
  carrinhoAberto = false;
  constructor(public carrinhoService: CarrinhoService) {};

  toggleCarrinho() {
    this.carrinhoAberto = !this.carrinhoAberto;
  }
}
