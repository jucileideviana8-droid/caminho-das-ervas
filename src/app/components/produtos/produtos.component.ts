import { Component, OnInit } from '@angular/core';
import { ProdutoComponent } from '../produto/produto.component';
import { CommonModule } from '@angular/common';
import { produtoModel } from '../../models/produto.model';
import { ProdutoService } from '../../services/produto.service';
import { CategoriaType } from '../../types/categoria.type';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule, ProdutoComponent],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css',
})
export class ProdutosComponent implements OnInit {
  produtos: produtoModel[] = [];
  produtosFiltrados: produtoModel[] = [];
  filtroAtual: any = "todos";

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
   
    this.produtoService.listar().subscribe((produtos: produtoModel[]) => {
      this.produtos = produtos;
      this.ouvirFiltros();
    });
  }

  private ouvirFiltros() {
    this.produtoService.filtro$.subscribe((filtro: any) => {
      this.filtroAtual = filtro;
      this.aplicarFiltro(filtro);
    });
  }

  aplicarFiltro(filtro: any) {
    
    if (!filtro || filtro === "todos" || filtro === "paginaInicial") {
      this.produtosFiltrados = this.produtos;
    } else {
      const termoBusca = filtro.toLowerCase();
      this.produtosFiltrados = this.produtos.filter((produto) => {
        const categoria =  produto.categoria ?produto.categoria.toLowerCase() : '';
        const nome =  produto.nome ? produto.nome.toLowerCase() : '';

    
        return categoria.includes(termoBusca) || nome.includes(termoBusca);
    });
  }
  console.log('Produtos após filtro:', this.produtosFiltrados.length);
}
}