import { Router } from "express";
import { inject, injectable } from "inversify";
import { DatabaseService } from "../services/database.service";
import Types from "../types";

@injectable()
export class DatabaseController {
  router: Router = Router();
  public constructor(
    // @ts-ignore -- À ENLEVER LORSQUE L'IMPLÉMENTATION EST TERMINÉE
    @inject(Types.DatabaseService) private readonly databaseService: DatabaseService
  ) {
    this.handleGetMedecins();
    this.handleDeleteMedecins();
    this.handlePostMedecins();
    this.handlePatchMedecins();
  }
  
  async handleGetMedecins() {
    this.router.get('/medecins', async (req, res) => {
      try {
        const result = await this.databaseService.query(
            `SELECT M.idMedecin, M.prenom, M.nom, M.specialite, M.anneesExperience, S.nomService 
            FROM Medecins M
            JOIN Services S ON M.idService = S.idService`
        );
        res.json(result.rows);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }  
    });
  }
   
  async handlePostMedecins() {
    this.router.post('/medecins', async (req, res) => {
      try {
        const { prenom, nom, specialite, anneesExperience, idService } = req.body;
        const result = await this.databaseService.query(
          "INSERT INTO Medecins (prenom, nom, specialite, anneesExperience, idService) VALUES ($1, $2, $3, $4, $5) RETURNING *",
          [prenom, nom, specialite, anneesExperience, idService]
        );
        res.json(result.rows[0]);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }  
    });
  }
   
  async handlePatchMedecins() {
    this.router.patch('/medecins/:id', async (req, res) => {
      try {
        const { prenom, nom, specialite, anneesExperience, idService } = req.body;
        const idMedecin = req.params.id;
        const result = await this.databaseService.query(
          "UPDATE Medecins SET prenom = $1, nom = $2, specialite = $3, anneesExperience = $4, idService = $5 WHERE idMedecin = $6 RETURNING *",
          [prenom, nom, specialite, anneesExperience, idService, idMedecin]
        );
        res.json(result.rows[0]);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }  
    });
  }
    
  async handleDeleteMedecins() {
    this.router.delete('/medecins/:id', async (req, res) => {
      // try {
      //   const idMedecin = req.params.id;
      //   const result = await this.databaseService.query(
      //     "DELETE FROM Medecins WHERE idMedecin = $1 RETURNING *",
      //     [idMedecin]
      //   );
      //   res.json(result.rows[0]);
      // } catch (error) {
      //   res.status(500).json({ error: error.message });
      // }  

      try {
        const idMedecin = req.params.id;
        await this.databaseService.query('BEGIN');
        await this.databaseService.query(
          "DELETE FROM Rendezvous WHERE idMedecin = $1",
          [idMedecin]
        );
        const result = await this.databaseService.query(
          "DELETE FROM Medecins WHERE idMedecin = $1 RETURNING *",
          [idMedecin]
        );
        await this.databaseService.query('COMMIT');
        res.json(result.rows[0]);
      } catch (error) {
        await this.databaseService.query('ROLLBACK');
        res.status(500).json({ error: error.message });
      }  
    });
  }

  // async handleGetServices() {
  //   this.router.get('/services', async (req, res) => {
  //     try {
  //       const result = await this.databaseService.query(
  //         "SELECT nomService FROM Services"
  //       );
  //       res.json(result.rows);
  //     } catch (error) {
  //       res.status(500).json({ error: error.message });
  //     }  
  //   });
  // }
}
