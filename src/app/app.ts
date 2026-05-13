import * as XLSX from 'xlsx';
import { DatabaseService } from './services/database.service';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PaginaInicialComponent } from './components/pagina-inicial/pagina-inicial.component';
import { RodapeComponent } from './components/rodape/rodape.component';
import { CabecalhoComponent } from './components/cabecalho/cabecalho.component';
import { ProdutosComponent } from './components/produtos/produtos.component';
import { SecaoSiteType } from './types/secao.type';
import { LoginComponent } from './components/login/login.component'; 
import { CarrinhoComponent } from './components/carrinho/carrinho.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
   
    RouterOutlet, 
    RodapeComponent,
    CabecalhoComponent,
    LoginComponent, CarrinhoComponent
  
 ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('front-caminho-das-ervas');

  constructor(private dbService: DatabaseService) {}

     aoCarregarPlanilha(event: any) {
    const elemento = event.target as HTMLInputElement;
    const arquivo = elemento.files ? elemento.files[0] : null;

    if (arquivo) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const planilha = workbook.Sheets[workbook.SheetNames[0]];
        const dadosJson = XLSX.utils.sheet_to_json(planilha);
        
        // Envia para o banco de dados
        this.dbService.importarProdutos(dadosJson);
      };
      reader.readAsArrayBuffer(arquivo);
    }
  }

  paginaAtual: SecaoSiteType = 'paginaInicial';

  mostrarLogin = false;

  usuarioLogado: string | null = null;

  ngOnInit(){
    this.usuarioLogado = localStorage.getItem('usuarioLogado');
  }

  onChangePaginaAtual(paginaAtual: SecaoSiteType){
    this.paginaAtual = paginaAtual;
  }

  onLoginSucesso(){
    this.mostrarLogin = false;
    this.usuarioLogado = localStorage.getItem('usuarioLogado');
  }

  logout(){
  localStorage.removeItem('usuarioLogado'); // apaga login
  this.usuarioLogado = null; // atualiza tela
}
}