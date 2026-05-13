import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarrinhoService } from '../../services/carrinho.service';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-pagamento',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './pagamento.component.html',
  styleUrl: './pagamento.component.css'
}) // CORREÇÃO: Removido o caractere ponto e vírgula e a chave órfã que quebravam a classe
export class PagamentoComponent {
  pagamentoRealizado: boolean = false;
  itensResumo: any[] = []; 
  
  // CORREÇÃO: Adicionada a variável valorTotal exigida pelo arquivo HTML
  valorTotal: number = 0;

  formularioPagamento = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
    cpf: new FormControl('', [Validators.required, Validators.pattern(/^\d{11}$/)]),
    endereco: new FormControl('', [Validators.required])
  });

  constructor(public carrinhoService: CarrinhoService) {}

  confirmarPagamento() {
    if (this.formularioPagamento.valid) {
      this.itensResumo = this.carrinhoService.getItens();
      
      // Preenche a variável que o HTML usa para exibir na tela de sucesso
      this.valorTotal = this.carrinhoService.getPrecoTotal();
      
      this.pagamentoRealizado = true;
      this.carrinhoService.limparCarrinho();
      
      console.log('Pedido Finalizado:', this.itensResumo);
    }
  }
}
