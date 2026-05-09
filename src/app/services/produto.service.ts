import { Injectable } from '@angular/core';
import { produtoModel } from '../models/produto.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  private API = 'http://localhost:3000/api/produtos';

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<any[]>(this.API);
  }

  getProdutos(): Observable<any[]> {
    // O caminho aponta para o JSON gerado da sua planilha
    return this.http.get<any[]>('assets/dados/produtos.json');
  }
}