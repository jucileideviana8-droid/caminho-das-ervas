import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class DatabaseService {
   private sqlite: SQLiteConnection;
  
  private db: any;
  

  constructor(private http: HttpClient) {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);

  }
  async importarProdutos(lista: any[]) {
    for (const prod of lista) {
      await this.db.execute(
        'INSERT INTO produtos (NOME, DESCRICAO, QUANTIDADE, PRECO, CATEGORIA, IMAGEM) VALUES (?, ?, ?, ?, ?, ?)',
        [prod.NOME, prod.DESCRICAO, prod.QUANTIDADE, prod.PRECO, prod.CATEGORIA, prod.IMAGEM] // Os nomes aqui devem ser iguais aos cabeçalhos da sua planilha
      );
    }
    console.log('Importação concluída!');
  }
}