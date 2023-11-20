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

  // public async query(text: string, params?: any[]): Promise<pg.QueryResult> {
  //   return this.pool.query(text, params);
  // }

  public async getMedecins(): Promise<pg.QueryResult> {
    const server = await this.pool.connect();
    const answer = await server.query(
      "SELECT M.idMedecin, M.prenom, M.nom, M.specialite, M.anneesExperience, M.idService, S.nomService FROM Medecins M JOIN Services S ON M.idService = S.idService ORDER BY M.idMedecin ASC"
    );
    server.release();
    return answer;
  }

  public async getServices(): Promise<pg.QueryResult> {
    const server = await this.pool.connect();
    const answer = await server.query(
      "SELECT * FROM Services ORDER BY idService ASC"
    );
    server.release();
    return answer;
  }

  public async postMedecins(idmedecin: number, prenom: string, nom: string, specialite: string, anneesExperience: number, idService: number): Promise<pg.QueryResult> {
    const server = await this.pool.connect();
    const answer = await server.query(
      "INSERT INTO Medecins (idmedecin, prenom, nom, specialite, anneesExperience, idService) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [idmedecin, prenom, nom, specialite, anneesExperience, idService]
    );
    server.release();
    return answer;

  }

  public async patchMedecins(idMedecin: number, prenom: string, nom: string, specialite: string, anneesExperience: number, idService: number): Promise<pg.QueryResult> {
    const server = await this.pool.connect();
    const answer = await server.query(
      "UPDATE Medecins SET prenom = $1, nom = $2, specialite = $3, anneesExperience = $4, idService = $5 WHERE idmedecin = $6 RETURNING *",
      [prenom, nom, specialite, anneesExperience, idService, idMedecin]
    );
    server.release();
    return answer;

  }

  public async deleteMedecins(idMedecin: number): Promise<pg.QueryResult> {
    const server = await this.pool.connect();
    await server.query(
      "DELETE FROM Rendezvous WHERE idMedecin = $1 RETURNING *",
      [idMedecin]
    );
    const answer = await server.query(
      "DELETE FROM Medecins WHERE idMedecin = $1 RETURNING *",
      [idMedecin]
    );
    server.release();
    return answer;
  }
    
}
