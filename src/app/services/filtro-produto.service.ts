import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CategoriaType } from '../types/categoria.type'; // Verifique se o caminho está correto

@Injectable({
  providedIn: 'root'
})
export class FiltroProdutoService {
  // Criamos o Subject para armazenar e transmitir o filtro atual
  private filtroSubject = new BehaviorSubject<any>("todos");
  FiltroAtual$ = this.filtroSubject.asObservable();

  constructor() { }

  setFiltro(categoria: any) {
    this.filtroSubject.next(categoria);
  }
}
