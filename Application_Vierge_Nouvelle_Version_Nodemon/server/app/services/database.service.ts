import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";

@injectable()
export class DatabaseService {
  public connectionConfig: pg.ConnectionConfig = {
    user: "td5_user",
    database: "hopital",
    password: "td5",
    port: 5432,          // Attention ! Peut aussi être 5433 pour certains utilisateurs
    host: "localhost",
    keepAlive: true
  };

  public pool: pg.Pool = new pg.Pool(this.connectionConfig);

  public async query(text: string, params?: any[]): Promise<pg.QueryResult> {
    return this.pool.query(text, params);
  }
}
