import { Injectable } from '@angular/core';
import { produtoModel } from '../models/produto.model';
import { Observable, BehaviorSubject } from 'rxjs'; // Adicionado BehaviorSubject
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  private API = 'http://localhost:3000/api/produtos';

  // 1. Criamos um "assunto" que guarda o filtro atual (começa com 'todos')
  private filtroSubject = new BehaviorSubject<string>('todos');
  
  // 2. Criamos um "observável" que os componentes podem assinar para saber quando o filtro muda
  filtro$ = this.filtroSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Método para buscar do banco (seu código original)
  listar(): Observable<produtoModel[]> {
    return this.http.get<produtoModel[]>(this.API);
  }

  // 3. Método para o cabeçalho "avisar" qual categoria foi clicada
  setFiltro(categoria: string) {
    console.log("Service recebeu novo filtro:", categoria);
    this.filtroSubject.next(categoria);
  }
}
