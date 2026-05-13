import { Routes } from '@angular/router';
import { PagamentoComponent } from './components/pagamento/pagamento.component';
import { PaginaInicialComponent } from './components/pagina-inicial/pagina-inicial.component';
import { ProdutosComponent } from './components/produtos/produtos.component';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';

export const routes: Routes = [
  { path: "", component:  PaginaInicialComponent },
  { path: "login", component: LoginComponent },
  { path: "produtos", component: ProdutosComponent },
  { path: "produtos/:categoria", component: ProdutosComponent },
  { path: 'pagamento', component: PagamentoComponent },
  { path: "cadastro", component: CadastroComponent },
];